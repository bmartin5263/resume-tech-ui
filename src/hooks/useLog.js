function useLog(clazz) {
  return (message) => {
    console.log("[" + clazz + "] " + message);
    return message;
  }
}

export default useLog;