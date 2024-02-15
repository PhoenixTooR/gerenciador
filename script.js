document.addEventListener('DOMContentLoaded', function () {
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task-input');
    const xpContainer = document.getElementById('xp-container');
    const achievementsContainer = document.getElementById('achievements-container'); // Adicionado

    let accumulatedXP = 0;
    let completedTasks = 0;
    let currentLevel = 1;

    window.addTask = function () {
        console.log('Botão adicionar tarefa clicado');
        if (newTaskInput && newTaskInput.value.trim() !== '') {
            const newTaskItem = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';

            const completeButton = document.createElement('button');
            completeButton.innerText = 'Concluir Tarefa';
            completeButton.onclick = function () {
                completeTask(newTaskItem, newTaskInput.value); // Passa o nome da tarefa
            };

            newTaskItem.appendChild(checkbox);
            newTaskItem.appendChild(document.createTextNode(newTaskInput.value));
            newTaskItem.appendChild(completeButton);
            taskList.appendChild(newTaskItem);

            // Limpar campo de entrada
            newTaskInput.value = '';
        }
    };

    function completeTask(taskItem, taskName) { // Adicionado o nome da tarefa como argumento
        const checkbox = taskItem.querySelector('input[type="checkbox"]');
        if (checkbox && !checkbox.checked) {
            taskItem.style.textDecoration = 'line-through';
            accumulatedXP += 10;
            showXPMessage();
            checkLevelUp();
            completedTasks++;
            checkTaskCompletion();

            // Adiciona uma conquista à div de conquistas
            addAchievement(taskName);
        } else {
            taskItem.style.textDecoration = 'none';
            accumulatedXP -= 10;
            showXPMessage();
            completedTasks--;
        }
    }

    function addAchievement(taskName) {
        const achievementElement = document.createElement('p');
        achievementElement.innerText = `Concluiu: ${taskName}`;
        achievementsContainer.appendChild(achievementElement);
    }

    function showXPMessage() {
        xpContainer.innerText = `XP acumulado: ${accumulatedXP} - Nível ${currentLevel}`;
        xpContainer.style.display = 'block'; // Exibe a div XP
    }

    function checkLevelUp() {
        if (accumulatedXP >= currentLevel * 30) {
            currentLevel++;
            console.log(`Parabéns! Você alcançou o Nível ${currentLevel}!`);
    
            // Adiciona a classe 'background-image'
            document.body.classList.add('background-image');
            showXPMessage();
    
            // Remove a classe 'background-image' após 2 segundos
            setTimeout(function() {
                document.body.classList.remove('background-image');
            }, 2000);
        }
    }
    
    function checkTaskCompletion() {
        if (completedTasks >= 3) {
            console.log('Parabéns! Você subiu de nível!');
            completedTasks = 0;
            // Remover a classe quando o usuário completa uma tarefa
            document.body.classList.remove('image'); // Corrigido de 'imagem' para 'background-image'
            checkLevelUp();
            showXPMessage();
        }
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});
