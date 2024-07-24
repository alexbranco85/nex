const express = require('express');
const app = express();
const router = express.Router();
require("dotenv-safe").config({ path: '.env' });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv-safe").config();

// ** Middlewares
const auth = require('../middlewares/auth');

// ** Controllers
const UserController = require('../controllers/UserController');
const TransactionController = require('../controllers/TransactionController');

// ** User
router.post('/login', UserController.login);
router.post('/register', UserController.register);

// ** Transactions
router.get('/alltransactions', auth, TransactionController.transactionsAllUsers);
router.post('/usertransactions', auth, TransactionController.transactionsByCpf);
router.post('/filtertransactions', TransactionController.transactionsByFilter);

module.exports = router;