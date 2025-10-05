import { world } from "@minecraft/server";
import * as ui from "@minecraft/server-ui";
import climas from "./data/climas.js";
const BIOMES = [
  "Desierto",
  "Tundra",
  "Bosque Templado",
  "Selva Tropical",
  "Sabana",
  "Pastizal",
  "Taiga",
];


world.afterEvents.playerInteractWithBlock.subscribe((event) => {
  const { block, player } = event;
  if (block.typeId !== "trigo:evaluador") return;

  const form = new ui.ModalFormData()
    .title("§l§aSelector de biomas")
    .dropdown("Selecciona un bioma:", BIOMES); // no default index

  form.show(player).then((res) => {
  if (res.canceled) {
    player.sendMessage("§e[TRIGO] Cerraste el selector.");
  } else {
    const chosenBiome = BIOMES[res.formValues[0]];
    const clima = climas[chosenBiome];

    player.sendMessage(`§a[TRIGO] Seleccionaste: §e${chosenBiome}`);
    player.sendMessage(`§bClima:§r 
      Humedad: §e${clima.humidity}§r g/Kg, 
      Temperatura promedio: §e${clima.temperature}°C§r, 
      Temperatura máxima: §e${clima.temperature_max}°C§r, 
      Temperatura minima: §e${clima.temperature_min}°C`);
  }
}).catch((e) => {
  console.warn("[TRIGO] UI error:", e);
  player.sendMessage("§c[TRIGO] Failed to show biome selector.");
});
});
