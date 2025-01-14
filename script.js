document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const toggleButton = document.getElementById('light-mode-toggle');
    const bookList = document.getElementById('book-list');

    // 书本数据（可以改为从 JSON 文件加载）
    const books = [
        { name: "example book", chapters: ["chapter 1.txt", "chapter 2.txt"] },
        { name: "范例书", chapters: ["第一章.txt", "第二章.txt"] }
    ];

    // 初始化书本列表
    books.forEach(book => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = "#";
        link.textContent = book.name;
        link.addEventListener('click', () => loadChapters(book));
        li.appendChild(link);
        bookList.appendChild(li);
    });

    // 加载章节列表
    function loadChapters(book) {
        const container = document.querySelector('.container');
        container.innerHTML = `
            <button id="light-mode-toggle" class="toggle-btn">${body.classList.contains('light-mode') ? '关灯' : '开灯'}</button>
            <h3>${book.name}</h3>
            <h4>章节列表</h4>
            <ul id="chapter-list"></ul>
            <a href="#" id="back-to-books">返回书本选择</a>
        `;

        const chapterList = document.getElementById('chapter-list');
        book.chapters.forEach(chapter => {
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.href = "#";
            link.textContent = chapter.replace('.txt', '');
            link.addEventListener('click', () => loadChapter(book.name, chapter));
            li.appendChild(link);
            chapterList.appendChild(li);
        });

        document.getElementById('back-to-books').addEventListener('click', () => location.reload());
    }

    // 加载章节内容
    function loadChapter(bookName, chapter) {
        const container = document.querySelector('.container');
        fetch(`books/${bookName}/${chapter}`)
            .then(response => response.text())
            .then(text => {
                container.innerHTML = `
                    <button id="light-mode-toggle" class="toggle-btn">${body.classList.contains('light-mode') ? '关灯' : '开灯'}</button>
                    <h3>${chapter.replace('.txt', '')}</h3>
                    <div class="content">${formatText(text)}</div>
                    <div class="navigation">
                        <a href="#" id="prev-chapter">上一章节</a> |
                        <a href="#" id="next-chapter">下一章节</a>
                    </div>
                    <div class="back-to-menu">
                        <a href="#" id="back-to-chapters">返回章节目录</a> |
                        <a href="#" id="back-to-books">返回书本选择</a>
                    </div>
                `;

                // 添加事件监听器
                document.getElementById('back-to-chapters').addEventListener('click', () => loadChapters(books.find(b => b.name === bookName)));
                document.getElementById('back-to-books').addEventListener('click', () => location.reload());
            });
    }

    // 格式化文本内容
    function formatText(text) {
        return text.split('\n').map(line => `<p>${line}</p>`).join('');
    }

    // 白天/夜间模式切换
    toggleButton.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        toggleButton.textContent = body.classList.contains('light-mode') ? '关灯' : '开灯';
    });
});
