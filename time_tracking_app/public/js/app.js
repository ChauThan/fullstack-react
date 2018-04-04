class TimersDashBoard extends React.Component {
  state = {
    timers: []
  }

  componentDidMount() {
    this.loadTimersFormServer();
    setInterval(this.loadTimersFormServer, 5000);
  }

  handleCreateFormSubmit = (timer) => { this.createTimer(timer); }
  handleEditFormSubmit = (timer) => { this.updateTimer(timer); }
  handleTrashClick = (id) => { this.deteleTimer(id); }
  handleStartClick = (id) => { this.startTimer(id); }
  handleStopClick = (id) => { this.stopTimer(id); }

  loadTimersFormServer = () => {
    client.getTimers(serverTimers => this.setState({ timers: serverTimers }));
  }

  createTimer = (timer) => {
    const timerToAdd = helpers.newTimer(timer);
    this.setState({
      timers: this.state.timers.concat(timerToAdd)
    });

    client.createTimer(timerToAdd);
  }

  updateTimer = (timer) => {
    var timers = this.state.timers.map(item => {
      if (item.id === timer.id) {
        return Object.assign({}, item, {
          title: timer.title,
          project: timer.project
        })
      }

      return item;
    });

    this.setState({ timers: timers });
    client.updateTimer(timer);
  }

  deteleTimer = (id) => {
    var timers = this.state.timers.filter(i => i.id !== id);

    this.setState({ timers: timers });
    client.deleteTimer({ id: id });
  }

  startTimer = (id) => {
    const now = Date.now();
    var timers = this.state.timers.map(item => {
      if (item.id === id) {
        return Object.assign({}, item, {
          runningSince: now,
        });
      }

      return item;
    })

    this.setState({ timers: timers });
    client.startTimer({ id: id, start: now });
  }

  stopTimer = (id) => {
    const now = Date.now();
    var timers = this.state.timers.map(item => {
      if (item.id === id) {
        const lastElapsed = now - item.runningSince;
        return Object.assign({}, item, {
          elapsed: item.elapsed + lastElapsed,
          runningSince: null,
        });
      }

      return item;
    })

    this.setState({ timers: timers });
    client.stopTimer({ id: id, stop: now });
  }

  render() {
    return (
      <div className="ui three column centered grid">
        <div className="column">
          <EditableTimerList
            timers={this.state.timers}
            onFormSubmit={this.handleEditFormSubmit}
            onTrashClick={this.handleTrashClick}
            onStartClick={this.handleStartClick}
            onStopClick={this.handleStopClick}
          />
          <ToggleableTimerForm
            onFormSubmit={this.handleCreateFormSubmit}
          />
        </div>
      </div>
    );
  }
}

class EditableTimerList extends React.Component {
  render() {
    const timerComponents = this.props.timers.map(timer => (
      <EditableTimer
        key={timer.id}
        id={timer.id}
        title={timer.title}
        project={timer.project}
        elapsed={timer.elapsed}
        runningSince={timer.runningSince}
        onFormSubmit={this.props.onFormSubmit}
        onTrashClick={this.props.onTrashClick}
        onStartClick={this.props.onStartClick}
        onStopClick={this.props.onStopClick}
      />
    ));

    return (
      <div id="timers">
        {timerComponents}
      </div>
    )
  }
}

class EditableTimer extends React.Component {
  state = {
    editFormOpen: false,
  }

  handleFormClose = () => { this.closeForm(); }

  handleEditClick = () => { this.openForm(); }

  handleFormSubmit = (timer) => {
    this.props.onFormSubmit(timer);
    this.closeForm();
  }

  openForm = () => {
    this.setState({ editFormOpen: true });
  }

  closeForm = () => {
    this.setState({ editFormOpen: false });
  }

  render() {
    if (this.state.editFormOpen) {
      return (
        <TimerForm
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
          onFormClose={this.handleFormClose}
          onFormSubmit={this.handleFormSubmit}
        />
      );
    }

    return (
      <Timer
        id={this.props.id}
        title={this.props.title}
        project={this.props.project}
        elapsed={this.props.elapsed}
        runningSince={this.props.runningSince}
        onEditClick={this.handleEditClick}
        onTrashClick={this.props.onTrashClick}
        onStartClick={this.props.onStartClick}
        onStopClick={this.props.onStopClick}
      />
    );
  }
}

class ToggleableTimerForm extends React.Component {
  state = {
    isOpen: false,
  };

  handleFormOpen = () => {
    this.setState({ isOpen: true });
  }

  handleFormClose = () => {
    this.setState({ isOpen: false });
  }

  handleFormSubmit = (timer) => {
    this.props.onFormSubmit(timer);
    this.setState({ isOpen: false });
  }

  render() {
    if (this.state.isOpen) {
      return (
        <TimerForm
          onFormClose={this.handleFormClose}
          onFormSubmit={this.handleFormSubmit} />
      )
    }

    return (
      <div className="ui basic content center aligned segment">
        <button className="ui basic button icon" onClick={this.handleFormOpen}>
          <i className="plus icon"></i>
        </button>
      </div>
    )
  }
}

class TimerForm extends React.Component {
  state = {
    title: this.props.title || '',
    project: this.props.project || '',
  }

  handleTitleChange = (e) => { this.setState({ title: e.target.value }); }

  handleProjectChange = (e) => { this.setState({ project: e.target.value }); }

  handleSubmit = () => {
    this.props.onFormSubmit({
      id: this.props.id,
      title: this.state.title,
      project: this.state.project
    });
  }

  render() {
    const submitText = this.props.id ? "Update" : "Create";

    return (
      <div className="ui centered card">
        <div className="content">
          <div className="ui form">
            <div className="field">
              <label htmlFor="title">Title</label>
              <input type="text" name="title" defaultValue={this.state.title} onChange={this.handleTitleChange} />
            </div>
            <div className="field">
              <label htmlFor="project">Project</label>
              <input type="text" name="project" defaultValue={this.state.project} onChange={this.handleProjectChange} />
            </div>

            <div className="ui two bottom attached buttons">
              <button className="ui basic blue button" onClick={this.handleSubmit}>
                {submitText}
              </button>
              <button className="ui basic red button" onClick={this.props.onFormClose}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class Timer extends React.Component {
  componentDidMount() {
    this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50);
  }

  componentWillUnmount() {
    clearInterval(this.forceUpdateInterval);
  }

  handleTrashClick = () => {
    this.props.onTrashClick(this.props.id);
  }

  handleStartClick = () => {
    this.props.onStartClick(this.props.id);
  }

  handleStopClick = () => {
    this.props.onStopClick(this.props.id);
  }

  render() {
    const elapsedString = helpers.renderElapsedString(this.props.elapsed, this.props.runningSince);

    return (
      <div className="ui centered card">
        <div className="content">
          <div className="header">
            {this.props.title}
          </div>
          <div className="meta">
            {this.props.project}
          </div>
          <div className="center aligned description">
            <h2>{elapsedString}</h2>
          </div>
          <div className="extra content">
            <span className="right floated edit icon" onClick={this.props.onEditClick}>
              <i className="edit icon"></i>
            </span>
            <span className="right floated edit icon" onClick={this.handleTrashClick}>
              <i className="trash icon"></i>
            </span>
          </div>
        </div>

        <TimerActionButton
          timerIsRunning={!!this.props.runningSince}
          onStartClick={this.handleStartClick}
          onStopClick={this.handleStopClick}
        />
      </div>
    )
  }
}

class TimerActionButton extends React.Component {
  render() {
    if (this.props.timerIsRunning) {
      return (
        <div className="ui bottom attached blue basic button" onClick={this.props.onStopClick}>
          Stop
        </div>
      )
    }

    return (
      <div className="ui bottom attached blue basic button" onClick={this.props.onStartClick}>
        Start
      </div>
    )
  }
}


ReactDOM.render(
  <TimersDashBoard />,
  document.getElementById('content')
);