function DebugEnv() {
  return (
    <div>
      <h3>Debug Env Vars</h3>
      <pre>{JSON.stringify(import.meta.env, null, 2)}</pre>
    </div>
  );
}

export default DebugEnv;
