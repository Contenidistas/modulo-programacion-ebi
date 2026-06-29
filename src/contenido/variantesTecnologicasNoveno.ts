export type VarianteTecnologica = {
  tecnologia: 'JavaScript' | 'Python' | 'PSeInt';
  explicacion: string;
  codigo: string;
};

export const variantesTecnologicasNoveno: Record<string, VarianteTecnologica[]> = {
  '9-algoritmos': [
    { tecnologia: 'JavaScript', explicacion: 'La ruta se expresa como una función que decide si necesita un camino alternativo.', codigo: 'function entregarLibro(destino, zonaCerrada) {\n  if (zonaCerrada) usarRutaAlternativa();\n  avanzarHasta(destino);\n  return "Entrega confirmada";\n}' },
    { tecnologia: 'Python', explicacion: 'La misma secuencia conserva entrada, decisión y confirmación final.', codigo: 'def entregar_libro(destino, zona_cerrada):\n    if zona_cerrada:\n        usar_ruta_alternativa()\n    avanzar_hasta(destino)\n    return "Entrega confirmada"' },
    { tecnologia: 'PSeInt', explicacion: 'El pseudocódigo permite revisar la lógica antes de elegir un lenguaje.', codigo: 'Proceso EntregarLibro\n  Leer destino, zonaCerrada\n  Si zonaCerrada Entonces\n    Escribir "Usar ruta alternativa"\n  FinSi\n  Escribir "Avanzar hasta ", destino\n  Escribir "Entrega confirmada"\nFinProceso' },
  ],
  '9-variables': [
    { tecnologia: 'JavaScript', explicacion: 'El stock cambia después de una venta y conserva el nuevo valor.', codigo: 'let stockAgua = 20;\nstockAgua = stockAgua - 1;\nconsole.log(`Quedan ${stockAgua}`);' },
    { tecnologia: 'Python', explicacion: 'La variable se actualiza con la misma operación.', codigo: 'stock_agua = 20\nstock_agua = stock_agua - 1\nprint(f"Quedan {stock_agua}")' },
    { tecnologia: 'PSeInt', explicacion: 'La flecha representa la asignación del nuevo valor.', codigo: 'Definir stockAgua Como Entero\nstockAgua <- 20\nstockAgua <- stockAgua - 1\nEscribir "Quedan ", stockAgua' },
  ],
  '9-constantes': [
    { tecnologia: 'JavaScript', explicacion: 'const protege el límite frente a reasignaciones accidentales.', codigo: 'const TEMPERATURA_MAXIMA = 60;\nlet temperaturaActual = 42;\nconsole.log(temperaturaActual <= TEMPERATURA_MAXIMA);' },
    { tecnologia: 'Python', explicacion: 'Python usa por convención mayúsculas para señalar un valor que no debe modificarse.', codigo: 'TEMPERATURA_MAXIMA = 60\ntemperatura_actual = 42\nprint(temperatura_actual <= TEMPERATURA_MAXIMA)' },
    { tecnologia: 'PSeInt', explicacion: 'PSeInt no protege constantes; el nombre y el acuerdo documentan que el límite no debe cambiar.', codigo: 'Definir TEMPERATURA_MAXIMA Como Real\nDefinir temperaturaActual Como Real\nTEMPERATURA_MAXIMA <- 60\ntemperaturaActual <- 42\nEscribir temperaturaActual <= TEMPERATURA_MAXIMA' },
  ],
  '9-tipos-datos': [
    { tecnologia: 'JavaScript', explicacion: 'Los valores representan texto, número y estado lógico.', codigo: 'const nombre = "Lucía";\nconst edad = 14;\nconst autorizaImagen = true;' },
    { tecnologia: 'Python', explicacion: 'Python reconoce los tipos a partir de los valores asignados.', codigo: 'nombre = "Lucía"\nedad = 14\nautoriza_imagen = True' },
    { tecnologia: 'PSeInt', explicacion: 'Los tipos se declaran explícitamente antes de asignar valores.', codigo: 'Definir nombre Como Cadena\nDefinir edad Como Entero\nDefinir autorizaImagen Como Logico\nnombre <- "Lucía"\nedad <- 14\nautorizaImagen <- Verdadero' },
  ],
  '9-entrada-datos': [
    { tecnologia: 'JavaScript', explicacion: 'prompt recibe texto; Number y la condición validan la medición.', codigo: 'const texto = prompt("Nivel de ruido en dB:");\nconst db = Number(texto);\nif (texto !== "" && db >= 0 && db <= 150) {\n  console.log(`Medición válida: ${db} dB`);\n} else {\n  console.log("Revisa el dato ingresado");\n}' },
    { tecnologia: 'Python', explicacion: 'try detecta datos no numéricos antes de comprobar el rango.', codigo: 'texto = input("Nivel de ruido en dB: ")\ntry:\n    db = float(texto)\n    if 0 <= db <= 150:\n        print(f"Medición válida: {db} dB")\n    else:\n        print("Valor fuera de rango")\nexcept ValueError:\n    print("Ingresa un número")' },
    { tecnologia: 'PSeInt', explicacion: 'La entrada se lee y luego se compara con los límites acordados.', codigo: 'Definir db Como Real\nEscribir "Nivel de ruido en dB:"\nLeer db\nSi db >= 0 Y db <= 150 Entonces\n  Escribir "Medición válida: ", db, " dB"\nSino\n  Escribir "Valor fuera de rango"\nFinSi' },
  ],
  '9-salida-datos': [
    { tecnologia: 'JavaScript', explicacion: 'La salida combina etiqueta, valor y unidad.', codigo: 'const consumo = 87;\nconsole.log(`Consumo registrado: ${consumo} kWh`);' },
    { tecnologia: 'Python', explicacion: 'Una cadena formateada comunica el valor con contexto.', codigo: 'consumo = 87\nprint(f"Consumo registrado: {consumo} kWh")' },
    { tecnologia: 'PSeInt', explicacion: 'Escribir reúne el mensaje y el dato procesado.', codigo: 'Definir consumo Como Real\nconsumo <- 87\nEscribir "Consumo registrado: ", consumo, " kWh"' },
  ],
  '9-estructuras-selectivas': [
    { tecnologia: 'JavaScript', explicacion: 'El operador || activa la ventilación cuando se cumple al menos una condición.', codigo: 'if (temperatura > 28 || humedad > 80) {\n  console.log("Abrir ventilación");\n} else {\n  console.log("Mantener cerrada");\n}' },
    { tecnologia: 'Python', explicacion: 'or expresa la misma decisión compuesta.', codigo: 'if temperatura > 28 or humedad > 80:\n    print("Abrir ventilación")\nelse:\n    print("Mantener cerrada")' },
    { tecnologia: 'PSeInt', explicacion: 'La estructura Si/Sino separa los dos caminos posibles.', codigo: 'Si temperatura > 28 O humedad > 80 Entonces\n  Escribir "Abrir ventilación"\nSino\n  Escribir "Mantener cerrada"\nFinSi' },
  ],
  '9-estructuras-repetitivas': [
    { tecnologia: 'JavaScript', explicacion: 'for procesa siete días y actualiza un acumulador.', codigo: 'let total = 0;\nfor (let dia = 1; dia <= 7; dia++) {\n  total += consumos[dia - 1];\n}\nconsole.log(total);' },
    { tecnologia: 'Python', explicacion: 'for recorre directamente las mediciones de la colección.', codigo: 'total = 0\nfor consumo in consumos:\n    total += consumo\nprint(total)' },
    { tecnologia: 'PSeInt', explicacion: 'Para controla el inicio, el final y el avance del contador.', codigo: 'total <- 0\nPara dia <- 1 Hasta 7 Hacer\n  total <- total + consumos[dia]\nFinPara\nEscribir total' },
  ],
  '9-funciones': [
    { tecnologia: 'JavaScript', explicacion: 'La función recibe parámetros y devuelve el costo calculado.', codigo: 'function calcularCosto(km, precioKm) {\n  return km * precioKm;\n}\nconsole.log(calcularCosto(12, 8.5));' },
    { tecnologia: 'Python', explicacion: 'La función reutiliza el mismo cálculo con otros valores.', codigo: 'def calcular_costo(km, precio_km):\n    return km * precio_km\n\nprint(calcular_costo(12, 8.5))' },
    { tecnologia: 'PSeInt', explicacion: 'La palabra Funcion explicita parámetros y valor de retorno.', codigo: 'Funcion costo <- CalcularCosto(km, precioKm)\n  costo <- km * precioKm\nFinFuncion\nEscribir CalcularCosto(12, 8.5)' },
  ],
  '9-listas': [
    { tecnologia: 'JavaScript', explicacion: 'El arreglo reúne las mediciones y for...of las recorre.', codigo: 'const lluvias = [32, 18, 41, 27];\nlet total = 0;\nfor (const valor of lluvias) total += valor;\nconsole.log(total / lluvias.length);' },
    { tecnologia: 'Python', explicacion: 'La lista puede recorrerse y su longitud permite calcular el promedio.', codigo: 'lluvias = [32, 18, 41, 27]\ntotal = 0\nfor valor in lluvias:\n    total += valor\nprint(total / len(lluvias))' },
    { tecnologia: 'PSeInt', explicacion: 'El dimensionamiento reserva posiciones y el ciclo las procesa.', codigo: 'Dimension lluvias[4]\nlluvias[1] <- 32\nlluvias[2] <- 18\nlluvias[3] <- 41\nlluvias[4] <- 27\ntotal <- 0\nPara i <- 1 Hasta 4 Hacer\n  total <- total + lluvias[i]\nFinPara\nEscribir total / 4' },
  ],
  '9-depuracion': [
    { tecnologia: 'JavaScript', explicacion: 'Las salidas temporales permiten comparar valores esperados y obtenidos.', codigo: 'const horaActual = 10;\nconst horaTimbre = 11;\nconsole.log({ horaActual, horaTimbre });\nconsole.log((horaTimbre - horaActual) * 60);' },
    { tecnologia: 'Python', explicacion: 'Mostrar valores intermedios ayuda a comprobar la hipótesis sobre las unidades.', codigo: 'hora_actual = 10\nhora_timbre = 11\nprint(hora_actual, hora_timbre)\nprint((hora_timbre - hora_actual) * 60)' },
    { tecnologia: 'PSeInt', explicacion: 'La traza manual hace visible cada valor antes del cálculo corregido.', codigo: 'horaActual <- 10\nhoraTimbre <- 11\nEscribir "Actual: ", horaActual\nEscribir "Timbre: ", horaTimbre\nEscribir "Faltan ", (horaTimbre - horaActual) * 60, " minutos"' },
  ],
};
