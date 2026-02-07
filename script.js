// Estructura de datos para memoria
let memoryBlocksBF = [];
let memoryBlocksWF = [];
let processes = [];
let processIdCounter = 1;

// Inicializar con bloques de memoria por defecto
function init() {
    addMemoryBlock(200);
    addMemoryBlock(150);
    addMemoryBlock(300);
    addMemoryBlock(100);
    updateDisplay();
}

// Agregar bloque de memoria
function addMemoryBlock(size = null) {
    const sizeInput = document.getElementById('memorySize');
    const blockSize = size || parseInt(sizeInput.value);

    if (!blockSize || blockSize <= 0) {
        showMessage('Por favor ingrese un tamaño válido', 'danger');
        return;
    }

    const block = {
        id: Date.now(),
        size: blockSize,
        allocated: false,
        processId: null
    };

    memoryBlocksBF.push({...block});
    memoryBlocksWF.push({...block});

    sizeInput.value = '';
    showMessage(`Bloque de ${blockSize} KB agregado`, 'success');
    updateDisplay();
}

// Reiniciar memoria
function resetMemory() {
    memoryBlocksBF = [];
    memoryBlocksWF = [];
    processes = [];
    processIdCounter = 1;
    init();
    showMessage('Memoria reiniciada', 'success');
}

// Agregar proceso
function addProcess() {
    const sizeInput = document.getElementById('processSize');
    const processSize = parseInt(sizeInput.value);

    if (!processSize || processSize <= 0) {
        showMessage('Por favor ingrese un tamaño válido para el proceso', 'danger');
        return;
    }

    const process = {
        id: processIdCounter++,
        size: processSize,
        allocatedBF: false,
        allocatedWF: false,
        blockBF: null,
        blockWF: null
    };

    processes.push(process);
    sizeInput.value = '';
    showMessage(`Proceso P${process.id} (${processSize} KB) agregado`, 'success');
    updateDisplay();
}

// Algoritmo Best Fit
function bestFit(blocks, processSize) {
    let bestIdx = -1;
    let bestSize = Infinity;

    for (let i = 0; i < blocks.length; i++) {
        if (!blocks[i].allocated && blocks[i].size >= processSize) {
            if (blocks[i].size < bestSize) {
                bestSize = blocks[i].size;
                bestIdx = i;
            }
        }
    }

    return bestIdx;
}

// Algoritmo Worst Fit
function worstFit(blocks, processSize) {
    let worstIdx = -1;
    let worstSize = -1;

    for (let i = 0; i < blocks.length; i++) {
        if (!blocks[i].allocated && blocks[i].size >= processSize) {
            if (blocks[i].size > worstSize) {
                worstSize = blocks[i].size;
                worstIdx = i;
            }
        }
    }

    return worstIdx;
}

// Asignar proceso
function allocateProcess() {
    const unallocatedProcesses = processes.filter(p => !p.allocatedBF && !p.allocatedWF);

    if (unallocatedProcesses.length === 0) {
        showMessage('No hay procesos pendientes de asignación', 'warning');
        return;
    }

    const process = unallocatedProcesses[0];

    // Asignar con Best Fit
    const bfIdx = bestFit(memoryBlocksBF, process.size);
    if (bfIdx !== -1) {
        memoryBlocksBF[bfIdx].allocated = true;
        memoryBlocksBF[bfIdx].processId = process.id;
        process.allocatedBF = true;
        process.blockBF = bfIdx;
    }

    // Asignar con Worst Fit
    const wfIdx = worstFit(memoryBlocksWF, process.size);
    if (wfIdx !== -1) {
        memoryBlocksWF[wfIdx].allocated = true;
        memoryBlocksWF[wfIdx].processId = process.id;
        process.allocatedWF = true;
        process.blockWF = wfIdx;
    }

    if (bfIdx === -1 && wfIdx === -1) {
        showMessage(`Proceso P${process.id} no pudo ser asignado en ningún algoritmo`, 'danger');
    } else if (bfIdx === -1) {
        showMessage(`Proceso P${process.id} solo asignado en Worst Fit`, 'warning');
    } else if (wfIdx === -1) {
        showMessage(`Proceso P${process.id} solo asignado en Best Fit`, 'warning');
    } else {
        showMessage(`Proceso P${process.id} asignado exitosamente en ambos algoritmos`, 'success');
    }

    updateDisplay();
}

// Liberar toda la memoria
function deallocateAll() {
    memoryBlocksBF.forEach(block => {
        block.allocated = false;
        block.processId = null;
    });

    memoryBlocksWF.forEach(block => {
        block.allocated = false;
        block.processId = null;
    });

    processes.forEach(p => {
        p.allocatedBF = false;
        p.allocatedWF = false;
        p.blockBF = null;
        p.blockWF = null;
    });

    showMessage('Toda la memoria ha sido liberada', 'success');
    updateDisplay();
}

// Calcular fragmentación
function calculateFragmentation(blocks) {
    const totalMemory = blocks.reduce((sum, block) => sum + block.size, 0);
    const freeBlocks = blocks.filter(b => !b.allocated);
    const freeMemory = freeBlocks.reduce((sum, block) => sum + block.size, 0);
    
    if (totalMemory === 0) return 0;
    
    // Fragmentación = (memoria libre en bloques pequeños / memoria total libre) * 100
    const avgFreeBlockSize = freeMemory / Math.max(freeBlocks.length, 1);
    const fragmentation = freeBlocks.length > 1 ? 
        (freeMemory / totalMemory) * (1 - avgFreeBlockSize / freeMemory) * 100 : 0;
    
    return fragmentation;
}

// Actualizar visualización
function updateDisplay() {
    // Actualizar bloques de memoria Best Fit
    const bfContainer = document.getElementById('memoryBlocksBestFit');
    bfContainer.innerHTML = memoryBlocksBF.map(block => `
        <div class="memory-block ${block.allocated ? 'allocated' : 'free'}">
            <div class="block-info">
                <span class="block-size">${block.size} KB</span>
                <span class="block-status ${block.allocated ? 'status-allocated' : 'status-free'}">
                    ${block.allocated ? `P${block.processId}` : 'Libre'}
                </span>
            </div>
        </div>
    `).join('');

    // Actualizar bloques de memoria Worst Fit
    const wfContainer = document.getElementById('memoryBlocksWorstFit');
    wfContainer.innerHTML = memoryBlocksWF.map(block => `
        <div class="memory-block ${block.allocated ? 'allocated' : 'free'}">
            <div class="block-info">
                <span class="block-size">${block.size} KB</span>
                <span class="block-status ${block.allocated ? 'status-allocated' : 'status-free'}">
                    ${block.allocated ? `P${block.processId}` : 'Libre'}
                </span>
            </div>
        </div>
    `).join('');

    // Actualizar lista de procesos Best Fit
    const processesBFContainer = document.getElementById('processesBestFit');
    processesBFContainer.innerHTML = processes.map(p => `
        <div class="process-item ${p.allocatedBF ? 'allocated' : 'waiting'}">
            <span><strong>P${p.id}</strong> - ${p.size} KB</span>
            <span>${p.allocatedBF ? '✓ Asignado' : '⏳ Esperando'}</span>
        </div>
    `).join('');

    // Actualizar lista de procesos Worst Fit
    const processesWFContainer = document.getElementById('processesWorstFit');
    processesWFContainer.innerHTML = processes.map(p => `
        <div class="process-item ${p.allocatedWF ? 'allocated' : 'waiting'}">
            <span><strong>P${p.id}</strong> - ${p.size} KB</span>
            <span>${p.allocatedWF ? '✓ Asignado' : '⏳ Esperando'}</span>
        </div>
    `).join('');

    // Actualizar estadísticas
    const fragBF = calculateFragmentation(memoryBlocksBF);
    const fragWF = calculateFragmentation(memoryBlocksWF);

    document.getElementById('fragBestFit').textContent = fragBF.toFixed(2) + '%';
    document.getElementById('fragWorstFit').textContent = fragWF.toFixed(2) + '%';

    const allocatedBF = processes.filter(p => p.allocatedBF).length;
    const allocatedWF = processes.filter(p => p.allocatedWF).length;

    document.getElementById('allocatedBF').textContent = allocatedBF;
    document.getElementById('allocatedWF').textContent = allocatedWF;

    // Actualizar barras de utilización
    const totalBF = memoryBlocksBF.reduce((sum, b) => sum + b.size, 0);
    const usedBF = memoryBlocksBF.filter(b => b.allocated).reduce((sum, b) => sum + b.size, 0);
    const usedPercentBF = totalBF > 0 ? (usedBF / totalBF * 100) : 0;

    const totalWF = memoryBlocksWF.reduce((sum, b) => sum + b.size, 0);
    const usedWF = memoryBlocksWF.filter(b => b.allocated).reduce((sum, b) => sum + b.size, 0);
    const usedPercentWF = totalWF > 0 ? (usedWF / totalWF * 100) : 0;

    document.getElementById('usedBF').style.width = usedPercentBF + '%';
    document.getElementById('usedBF').textContent = usedPercentBF.toFixed(1) + '%';
    document.getElementById('freeBF').style.width = (100 - usedPercentBF) + '%';
    document.getElementById('freeBF').textContent = (100 - usedPercentBF).toFixed(1) + '%';

    document.getElementById('usedWF').style.width = usedPercentWF + '%';
    document.getElementById('usedWF').textContent = usedPercentWF.toFixed(1) + '%';
    document.getElementById('freeWF').style.width = (100 - usedPercentWF) + '%';
    document.getElementById('freeWF').textContent = (100 - usedPercentWF).toFixed(1) + '%';
}

// Mostrar mensajes
function showMessage(message, type) {
    const messageArea = document.getElementById('messageArea');
    messageArea.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
    setTimeout(() => {
        messageArea.innerHTML = '';
    }, 3000);
}

// Inicializar al cargar
init();