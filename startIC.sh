echo "Checking Canister ITO Cycles..."
dfx canister --network ic status ito
sleep 2
echo "Checking Canister Story Cycles..."
dfx canister --network ic status story
sleep 2
DFX_MOC_PATH="$(vessel bin)/moc" dfx deploy --network ic ito
DFX_MOC_PATH="$(vessel bin)/moc" dfx deploy --network ic story
DFX_MOC_PATH="$(vessel bin)/moc" dfx deploy --network ic --no-wallet