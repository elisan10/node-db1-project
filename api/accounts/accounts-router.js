const router = require("express").Router();
const {
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
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

router.post(
  "/",
  checkAccountPayload,
  checkAccountNameUnique,
  (req, res, next) => {
    // DO YOUR MAGIC

    Accounts.create(req.body)
      .then((account) => {
        res.status(201).json(account);
      })
      .catch(next);
  }
);

router.put("/:id", checkAccountId, checkAccountPayload, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.updateById(req.params.id, req.body)
    .then((account) => {
      res.status(200).json(account);
    })
    .catch(next);
});

router.delete("/:id", checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.deleteById(req.params.id)
    .then(() => {
      res.status(200).json({ message: "delete was successful" });
    })
    .catch(next);
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
