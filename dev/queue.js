
class Queue {
  constructor() {
    this.onStart = null; // callback
    this.onEnd = null; // callback
    this.__started__ = false;
    this.__queue__ = []; // task list
  }

  get isStarted() {
    return this.__started__;
  }

  get isEnded() {
    return !this.__started__;
  }

  get queue() {
    const self = this;
    return self.__queue__.map(function(task) {
      return self.__serialize__(task);
    });
  }

  get first() {
    return this.__queue__.length > 0 ? this.__serialize__(this.__queue__[0]) : null;
  }
  
  get last() {
    return this.__queue__.length > 0 ? this.__serialize__(this.__queue__[this.__queue__.length-1]) : null;
  }
  
  get previous() {
    for (let i = this.__queue__.length - 1; i >= 0; i--) {
      const task = this.__queue__[i];
      if (task.isStarted && task.isEnded) {
        return this.__serialize__(task);
      }
    }
    return null;
  }

  get current() {
    for (const task of this.__queue__) {
      if (task.isStarted && !task.isEnded) {
        return this.__serialize__(task);
      }
    }
    return null;
  }

  get next() {
    for (const task of this.__queue__) {
      if (!task.isStarted && !task.isEnded) {
        return this.__serialize__(task);
      }
    }
    return null;
  }
};

Queue.prototype.__serialize__ = function(task) {
  return {
    id: task.id,
    isStarted: task.isStarted,
    isEnded: task.isEnded,
    isErrored: task.isErrored,
    isSucceeded: task.isSucceeded,
    result: task.result,
    error: task.error,
    arguments: task.arguments,
    createdAt: task.createdAt,
    startedAt: task.startedAt,
    endedAt: task.endedAt,
  }
}

Queue.prototype.startTask = function(task) {
  const self = this;
  try {
    task.isStarted = true;
    task.startedAt = new Date().valueOf();
    if (typeof(self.onStart) === "function") {
      self.onStart(null, self.__serialize__(task));
    }
    const proc = task.function(...task.arguments);
    if (proc instanceof Promise) {
      proc
        .then(function(value) {
          task.isEnded = true;
          task.isSucceeded = true;
          task.result = value;
          task.endedAt = new Date().valueOf();
          task.function = null;
          if (typeof(self.onEnd) === "function") {
            self.onEnd(task.error, self.__serialize__(task));
          }
          self.start(true);
        })
        .catch(function(err) {
          task.isEnded = true;
          task.isErrored = true;
          task.error = err;
          task.endedAt = new Date().valueOf();
          task.function = null;
          if (typeof(self.onEnd) === "function") {
            self.onEnd(task.error, self.__serialize__(task));
          }
          self.start(true);
        });
    } else {
      Promise.resolve(proc)
        .then(function(value) {
          task.isEnded = true;
          task.isSucceeded = true;
          task.result = value;
          task.endedAt = new Date().valueOf();
          task.function = null;
          if (typeof(self.onEnd) === "function") {
            self.onEnd(task.error, self.__serialize__(task));
          }
          self.start(true);
        });
    }
  } catch(err) {
    Promise.reject(err)
      .then(function(err) {
        task.isEnded = true;
        task.isErrored = true;
        task.error = err;
        task.endedAt = new Date().valueOf();
        task.function = null;
        if (typeof(self.onEnd) === "function") {
          self.onEnd(task.error, self.__serialize__(task));
        }
        self.start(true);
      });
  }
}

Queue.prototype.add = function(func, args) {
  if (!isFunction(func)) {
    throw new Error("Type is invalid.");
  }

  const newTask = {
    id: this.__queue__.length,
    isStarted: false,
    isEnded: false,
    isErrored: false,
    isSucceeded: false,
    result: null,
    error: null,
    function: func,
    arguments: isArray(args) ? args : [args],
    createdAt: new Date().valueOf(),
    startedAt: null,
    endedAt: null,
  }

  this.__queue__.push(newTask);

  return newTask.id;
}

Queue.prototype.start = function(force) {
  const self = this;

  // check in progress
  if (!force && self.__started__) {
    throw new Error("Already in progress.");
  } else {
    self.__started__ = true;
  }

  // search next task
  let nextTask;
  for (const task of self.__queue__) {
    if (!task.isStarted && !task.isEnded) {
      nextTask = task;
      break;
    }
  }

  if (nextTask) {
    self.startTask(nextTask);
  } else {
    // end
    self.__started__ = false;
  }
}

Queue.prototype.clear = function(force) {
  const self = this;
  if (!force && self.__started__) {
    throw new Error("Already in progress.");
  }
  self.__queue__ = [];
}

export default Queue;