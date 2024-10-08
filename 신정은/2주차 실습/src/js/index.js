// TODO LS read & write
// localStorage에 데이터를 저장한다. 
// localStorage 에 있는 데이터를 읽어온다. ​

// TODO 카테고리별 메뉴판 관리
// 에스프레소 메뉴판 관리 
// 프라푸치노 메뉴판 관리
// 블렌디드 메뉴판 관리
// 티바나 메뉴판 관리
// 디저트 메뉴판 관리

// TODO 페이지 접근시 최초 데이터 Read & Rendering 
// 페이지에 최초로 접근할 때 localStorage 에 에스프레소 메뉴를 읽어온다.
// 에스프레소 메뉴를 페이지에 그려준다.

const $ = (selector) => document.querySelector(selector);

const store = {
    setLocalStorage(menu) {
        localStorage.setItem("menu", JSON.stringify(menu));
    },
    getLocalStorage() {
        return JSON.parse(localStorage.getItem("menu")) || [];
    },
};

function App() {
    // 상태는 변하는 데이터, 이 앱에서 변하는 것이 무엇인가: 메뉴명
    this.menu = [];

    const updateMenuCount = () => {
        const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
        $(".menu-count").innerText = `총 ${menuCount}개`;
    };

    const addMenuName = () => {
        if ($("#espresso-menu-name").value === "") {
            alert("값을 입력해주세요");
            return;
        }

        const espressoMenuName = $("#espresso-menu-name").value;
        this.menu.push({ name: espressoMenuName });
        store.setLocalStorage(this.menu);

        const template = this.menu
            .map((item) => {
                return `
                <li class="menu-list-item d-flex items-center py-2">
                    <span class="w-100 pl-2 menu-name">${item.name}</span>
                    <button
                        type="button"
                        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
                    >
                        수정
                    </button>
                    <button
                        type="button"
                        class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
                    >
                        삭제
                    </button>
                </li>`;
            })
            .join("");

        $("#espresso-menu-list").innerHTML = template;
        updateMenuCount();
        $("#espresso-menu-name").value = "";
    };

    const updateMenuName = (e) => {
        const $menuName = e.target.closest("li").querySelector(".menu-name");
        const menuName = $menuName.innerText;
        const updatedMenuName = prompt("신규 메뉴명을 입력하세요", menuName);
        $menuName.innerText = updatedMenuName;
    };

    const removeMenuName = (e) => {
        if (confirm("정말 삭제하시겠습니까?")) {
            e.target.closest("li").remove();
            updateMenuCount();
        }
    };

    // 메뉴 수정 
    $("#espresso-menu-list").addEventListener("click", (e) => {
        if (e.target.classList.contains("menu-edit-button")) {
            updateMenuName(e);
        }

        // 메뉴 삭제
        if (e.target.classList.contains("menu-remove-button")) {
            removeMenuName(e);
        }
    });

    // form 태그가 자동으로 전송되는 걸 막기 
    $("#espresso-menu-form").addEventListener("submit", (e) => {
        e.preventDefault();
    });

    // 메뉴 이름 입력받기 (클릭)
    $("#espresso-menu-submit-button").addEventListener("click", addMenuName);

    // 메뉴의 이름 입력받기 (엔터) 
    $("#espresso-menu-name").addEventListener("keypress", (e) => {
        if (e.key !== "Enter") {
            return;
        }
        addMenuName();
    });
}

App();
