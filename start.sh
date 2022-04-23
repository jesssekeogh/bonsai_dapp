echo "Starting DFX server..."
dfx stop >/dev/null 2>&1
dfx start --clean --background >/dev/null 2>&1 || { echo "error starting server!"; exit 1; }
echo "Creating Canisters..."
dfx canister create --all >/dev/null 2>&1 || { echo "error creating canisters!"; exit 1; }
echo "Building Canisters..."
DFX_MOC_PATH="$(vessel bin)/moc" dfx build >/dev/null 2>&1 || { echo "error building canisters!"; exit 1; }
echo "Installing Canisters..."
dfx canister install --all >/dev/null 2>&1 || { echo "error installing canisters!"; exit 1; }
echo "App Started Successfully!"