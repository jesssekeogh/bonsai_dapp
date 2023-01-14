echo "Starting DFX server..."
dfx stop >/dev/null 2>&1
dfx start --clean --background >/dev/null 2>&1 || { echo "error starting server!"; exit 1; }
echo "Launching Canisters..."
# dfx deploy >/dev/null 2>&1 || { echo "error deploying canisters!"; exit 1; }
dfx deploy index >/dev/null 2>&1 || { echo "error deploying index canister!"; exit 1; }
dfx deploy ito >/dev/null 2>&1 || { echo "error deploying ito canister!"; exit 1; }
dfx deploy kontribute_dapp_assets >/dev/null 2>&1 || { echo "error deploying frontend canister!"; exit 1; }
echo "App Started Successfully!"