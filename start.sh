echo "Starting DFX server..."
dfx stop >/dev/null 2>&1
dfx start --clean --background >/dev/null 2>&1 || { echo "error starting server!"; exit 1; }
echo "Creating Canisters..."
dfx deploy >/dev/null 2>&1 || { echo "error deploying canisters!"; exit 1; }
echo "App Started Successfully!"