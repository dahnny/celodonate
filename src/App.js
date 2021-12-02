import React, { useState, useCallback, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "./components/Details";

import watcher from "./contracts/watcher.abi.json";
import ierc20 from "./contracts/ierc20.abi.json";
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import BigNumber from "bignumber.js";

const ERC20_DECIMALS = 18;

const contractAddress = "0x016F733aE25aDFb742FE8C776a59e6F7dFfc2997";
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";

function App() {
  const [contract, setcontract] = useState(null);
  const [address, setAddress] = useState(null);
  const [kit, setKit] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cUSDBalance, setcUSDBalance] = useState(0);
  const [organizations, setOrganizations] = useState([]);

  const connectToWallet = async () => {
    if (window.celo) {
      try {
        await window.celo.enable();
        const web3 = new Web3(window.celo);
        let kit = newKitFromWeb3(web3);

        const accounts = await kit.web3.eth.getAccounts();
        const user_address = accounts[0];

        kit.defaultAccount = user_address;

        await setAddress(user_address);
        await setKit(kit);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Error Occurred");
    }
  };

  const getBalance = useCallback(async () => {
    try {
      const balance = await kit.getTotalBalance(address);
      const USDBalance = balance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);

      const contract = new kit.web3.eth.Contract(watcher, contractAddress);
      setcontract(contract);
      setcUSDBalance(USDBalance);
    } catch (error) {
      console.log(error);
    }
  }, [address, kit]);

  const getOrganizations = useCallback(async () => {
    const organizationLength = await contract.methods
      .getOrganizationLength()
      .call();
    const organizations = [];

    for (let index = 0; index < organizationLength; index++) {
      let _organizations = new Promise(async (resolve, reject) => {
        let organization = await contract.methods
          .getOrganizations(index)
          .call();

        resolve({
          index: index,
          organizationAddress: organization[0],
          name: organization[1],
          category: organization[2],
          description: organization[3],
          totalAmount: organization[4],
          totalPersons: organization[5],
        });
      });
      organizations.push(_organizations);
    }

    const _organizations = await Promise.all(organizations);
    setOrganizations(_organizations);
  }, [contract]);

  const isUserAdmin = async () => {
    const isAdmin = await contract.methods.isUserAdmin(address).call();
    console.log(isAdmin);
    setIsAdmin(isAdmin);
  };

  const addOrganization = async (_name, _category, _description, _address) => {
    try {
      await contract.methods
        .addOrganization(_address, _name, _category, _description)
        .send({ from: address });
      getOrganizations();
    } catch (error) {
      console.log(error);
    }
  };

  const donateToOrganization = async (_index, _amount) => {
    try {
      const cUSDContract = new kit.web3.eth.Contract(
        ierc20,
        cUSDContractAddress
      );
      const amount = new BigNumber(_amount)
        .shiftedBy(ERC20_DECIMALS)
        .toString();
      await cUSDContract.methods
        .approve(contractAddress, amount)
        .send({ from: address });
      await contract.methods
        .donateToOrganization(_index, amount)
        .send({ from: address });
      getOrganizations();
      getBalance();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    connectToWallet();
  }, []);

  useEffect(() => {
    if (kit && address) {
      getBalance();
    }
  }, [kit, address, getBalance]);
  useEffect(() => {
    if (contract) {
      getOrganizations();
      isUserAdmin();
    }
  }, [contract, getOrganizations]);
  return (
    <BrowserRouter>
      <Navbar balance={cUSDBalance} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              organizations={organizations}
              isAdmin={isAdmin}
              addOrganization={addOrganization}
            />
          }
        />
        <Route
          path="/details/:index"
          element={
            <Details
              organizations={organizations}
              donateToOrganization={donateToOrganization}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
