const router = require("express").Router();
const {
  checkAccountId,
  checkAccountPayload,
} = require("./accounts-middleware");
const Accounts = require("./accounts-model");

router.get("/", async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Accounts.getAll();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  res.json(req.accounts);
  next();
});

router.post("/", checkAccountPayload, (req, res, next) => {
  // DO YOUR MAGIC
});

router.put("/:id", (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete("/:id", (req, res, next) => {
  // DO YOUR MAGIC
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: "something went wrong inside the accounts router",
    errMessage: err.message,
  });
});

module.exports = router;
