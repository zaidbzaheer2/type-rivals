const Lobby = require("../models/lobby");

exports.verifyLobbyCode = (req, res) => {
  const { lobbyCode } = req.body;

  console.log(lobbyCode);
  Lobby.findOne({ lobbyCode: lobbyCode })
    .then((lobby) => {
      if (!lobby) {
        return Promise.reject({ status: 404, message: "Lobby not found" });
      }

      res.status(200).send({ lobbySize: lobby.lobbySize });
    })
    .catch((err) => {
      console.log(err);
      const statusCode = err.status || 500;
      res.status(statusCode).send({ message: err.message });
    });
};
