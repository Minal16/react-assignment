const actionToStream = (subject) => (...args) => subject.next(...args);

export default actionToStream;
