echo "Checking Canister ITO Cycles..."
dfx canister --network ic status ito
sleep 2
echo "Checking Canister Story Cycles..."
dfx canister --network ic status story
sleep 2
dfx deploy --network ic