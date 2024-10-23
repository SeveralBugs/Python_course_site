let counter = 0;
document.getElementById("add-button").addEventListener("click", function() {
    const userInput = document.getElementById("user-input").value.trim();
    let userName = document.getElementById("user-name").value.trim();
    if (userName === "") {
        userName = "Аноним";
    }
    if (userInput === "") {
        alert("Введите текст");
    } else if (userInput.length > 100) {
        alert("Текст слишком длинный");
    } else {
        const commentDiv = document.createElement("div");
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `
            <div class="comment-header">
                <span class="comment-author">` + userName + `</span>
                <span class="comment-date">` + getCurrentTime() + `</span>
            </div>
            <div class="comment-text">` + userInput + `</div>
            <div class="vote-controls">
                <button class="vote-up">+</button>
                <button class="vote-down">-</button>
                <span class="vote-counter">0</span>
            </div>
            <button class="close-btn">X</button>`;
        
        document.getElementById("content-area").appendChild(commentDiv);
        document.getElementById("user-input").value = "";
        document.getElementById("user-name").value = "";
        counter++;
        console.log("Количество элементов: " + counter);
    }
});


document.getElementById("content-area").addEventListener("click", function(event) {
    if (event.target.className === "close-btn") {
        event.target.closest('div').remove();
    }
});

document.getElementById("sort-button").addEventListener("click", function() {
    // Получаем контейнер с комментариями и все элементы комментариев
    const container = document.getElementById("content-area");
    const comments = Array.from(container.getElementsByClassName("comment"));

    // Сортируем комментарии по числу голосов
    comments.sort(function(a, b) {
        const voteA = parseInt(a.querySelector(".vote-counter").textContent.trim());
        const voteB = parseInt(b.querySelector(".vote-counter").textContent.trim());

        // Сортировка в порядке убывания (сначала комментарии с наибольшим количеством голосов)
        return voteB - voteA;
    });

    // Удаляем старые элементы и вставляем отсортированные
    comments.forEach(comment => {
      container.appendChild(comment);
    });
});

function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Месяцы начинаются с 0
    const year = now.getFullYear();
    
    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}

document.getElementById("content-area").addEventListener('click', function(event) {
    if (event.target.classList.contains('vote-up')) {
        const voteCounter = event.target.nextElementSibling.nextElementSibling;
        let voteCount = parseInt(voteCounter.textContent);
        voteCounter.textContent = ++voteCount;
    }

    if (event.target.classList.contains('vote-down')) {
        const voteCounter = event.target.nextElementSibling;
        let voteCount = parseInt(voteCounter.textContent);
        voteCounter.textContent = --voteCount;
    }
});
