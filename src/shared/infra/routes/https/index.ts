import { Router } from "express";
import { cepsRoutes } from "./ceps.routes";
import { doctorRoutes } from "./doctors.routes";
import { specialtiesRoutes } from "./specialties.routes";





const router = Router();

router.use("/specialties", specialtiesRoutes);

router.use("/ceps", cepsRoutes)

router.use("/doctors",doctorRoutes )

export { router};