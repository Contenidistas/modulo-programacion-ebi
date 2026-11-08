import zipfile
import os

zip_filename = 'scorm-modulo-programacion.zip'
manifest_files = [
    'imsmanifest.xml',
    'index.html',
    'assets/styles.css',
    'assets/main.js',
    'assets/scorm.js',
    'assets/jszip.min.js',
    'assets/logo-edytic.jpg',
    'assets/audio/01-introduccion.webm',
    'assets/audio/02-explicacion-actividad.webm',
    'assets/audio/03-algoritmo-inicial.webm',
    'assets/audio/04-programa-scratch.webm',
    'assets/audio/05-programa-makecode.webm',
    'assets/media/SolucionInicial.png',
    'assets/media/consola.mp4',
    'assets/media/vista1.mp4',
    'assets/media/consola_poster.png',
    'assets/media/vista1_poster.png',
    'assets/media/scratch_01_establecer_objetos_f1.png',
    'assets/media/scratch_01_establecer_objetos_f2.png',
    'assets/media/scratch_01_establecer_objetos_f3.png',
    'assets/media/scratch_02_definir_variables_f1.png',
    'assets/media/scratch_02_definir_variables_f2.png',
    'assets/media/scratch_02_definir_variables_f3.png',
    'assets/media/scratch_03_programar_objetos_f1.png',
    'assets/media/scratch_03_programar_objetos_f2.png',
    'assets/media/scratch_03_programar_objetos_f3.png',
    'assets/media/makecode_01_definir_entradas_f1.png',
    'assets/media/makecode_01_definir_entradas_f2.png',
    'assets/media/makecode_01_definir_entradas_f3.png',
    'assets/media/makecode_02_entradas_microbit_f1.png',
    'assets/media/makecode_02_entradas_microbit_f2.png',
    'assets/media/makecode_02_entradas_microbit_f3.png',
    'assets/media/makecode_03_resultado_ab_f1.png',
    'assets/media/makecode_03_resultado_ab_f2.png',
    'assets/media/makecode_03_resultado_ab_f3.png',
    'assets/media/algoritmo_ejecucion_paso_a_paso_f1.png',
    'assets/media/algoritmo_ejecucion_paso_a_paso_f2.png',
    'assets/media/algoritmo_ejecucion_paso_a_paso_f3.png'
]

print(f"Building {zip_filename}...")
with zipfile.ZipFile(zip_filename, 'w', compression=zipfile.ZIP_DEFLATED) as z:
    for f in manifest_files:
        if os.path.exists(f):
            z.write(f, f)
            print(f"Added {f} ({os.path.getsize(f)} bytes)")
        else:
            print(f"WARNING: File not found: {f}")

size_mb = os.path.getsize(zip_filename) / (1024 * 1024)
print(f"\nSUCCESS! Created {zip_filename} with size {size_mb:.2f} MB")
