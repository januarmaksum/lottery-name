export default function ActionsApp({
  uiProps,
  isLoading,
  handleStart,
  handleStop,
}) {
  return (
    <div className="button-wrapper style1">
      <button
        type="button"
        disabled={isLoading}
        onClick={() => {
          uiProps.buttonDisabled ? handleStop() : handleStart();
        }}
        className="background-button"
        title={uiProps.buttonDisabled ? "STOP" : "START"}
      ></button>
    </div>
  );
}
