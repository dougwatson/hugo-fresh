
window.userWalletAddress = null;

window.onload = async (event) => {
  // check if ethereum extension is installed
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum); // create web3 instance
  } else {
    console.log("Please install MetaMask or any Ethereum Extension Wallet");
  }
  // check if user is already logged in and update the global userWalletAddress variable
  window.userWalletAddress = window.localStorage.getItem("userWalletAddress");
  showUserDashboard();
};

// Web3 login function
const login = async () => {
  if (window.web3) {
    try {
      const selectedAccount = await window.ethereum // get the user's ethereum account - prompts metamask to login
        .request({
          method: "eth_requestAccounts",
        })
        .then((accounts) => accounts[0])
        .catch(() => {
          throw Error("Please select an account"); // if the user cancels the login prompt
        });
      window.userWalletAddress = selectedAccount;
      window.localStorage.setItem("userWalletAddress", selectedAccount);
      showUserDashboard();
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("wallet not found");
  }
};

// function to show the user dashboard
const showUserDashboard = async () => {
  // if the user is not logged in - userWalletAddress is null
  if (!window.userWalletAddress) {
    document.title = "Web3 Login";
   // document.querySelector(".login-section").style.display = "flex"; // show the login section
   // document.querySelector(".dashboard-section").style.display = "none"; // hide the user dashboard section
    document.querySelector("#login").style.display = "block"; // show the login section
    document.querySelector("#logout").style.display = "none"; // hide the user dashboard section
    return false;
  }
  document.title = "Web3 Dashboard  🤝";
  document.querySelector("#login").style.display = "none";  // hide the login section
  document.querySelector("#logout").style.display = "block";  // show the dashboard section
  showUserWalletAddress();
  //getWalletBalance();
};

const showUserWalletAddress = () => {
  const walletAddressEl = document.querySelector("#address");
  walletAddressEl.innerHTML = window.userWalletAddress;
};

// get the user's wallet balance
const getWalletBalance = async () => {
  if (!window.userWalletAddress) {
    return false;
  }
  const balance = await window.web3.eth.getBalance(window.userWalletAddress);
  // convert the balance to ether
  document.querySelector("#balance").innerHTML = web3.utils.fromWei(
    balance,
    "ether"
  );
};

// web3 logout function
const logout = () => {
  document.querySelector("#address").innerHTML=""
  window.userWalletAddress = null;  // set the global userWalletAddress variable to null
  window.localStorage.removeItem("userWalletAddress");
  // show the user dashboard
  showUserDashboard();
};

// when the user clicks the login button run the loginWithEth function
//document.querySelector(".login-btn").addEventListener("click", loginWithEth);

// when the user clicks the logout button run the logout function
//document.querySelector(".logout-btn").addEventListener("click", logout);
