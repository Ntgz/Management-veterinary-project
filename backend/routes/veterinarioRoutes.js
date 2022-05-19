import express from "express"
import { registrar, perfil, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword, actualizarPerfil } from "../controllers/veterinarioController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registrar);

router.post("/olvide-password", olvidePassword);

router.get("/olvide-password/:token", comprobarToken);

router.post("/olvide-password/:token", nuevoPassword);

router.get("/confirmar/:token", confirmar);

router.post("/login", autenticar);

router.get("/perfil", checkAuth, perfil);
router.put('/perfil/:id', checkAuth, actualizarPerfil)
export default router;