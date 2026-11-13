// Sample Book Catalog Data with Cover Image Placeholders
const books = [
    {
        id: 1,
        title: "Clean Code: A Handbook of Agile Software Craftsmanship",
        author: "Robert C. Martin",
        category: "IT/Programming",
        summary: "Learn the essentials of writing readable, maintainable, and robust software code.",
        status: "Available",
        cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        title: "Calculus: Early Transcendentals",
        author: "James Stewart",
        category: "Mathematics",
        summary: "A comprehensive mathematical exploration of limits, derivatives, integrals, and series.",
        status: "Borrowed",
        cover: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        title: "Cosmos: A Personal Voyage",
        author: "Carl Sagan",
        category: "Science",
        summary: "An inspiring exploration of the universe, space-time, and the history of scientific discovery.",
        status: "Available",
        cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        category: "Literature",
        summary: "A profound classic novel addressing racial injustice and moral growth in the American South.",
        status: "Available",
        cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        title: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        category: "History",
        summary: "Traces the incredible evolution and impact of humankind from the Stone Age to modern times.",
        status: "Borrowed",
        cover: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        title: "Introduction to Algorithms",
        author: "Thomas H. Cormen et al.",
        category: "IT/Programming",
        summary: "The definitive guide to understanding, designing, and analyzing efficient computer algorithms.",
        status: "Available",
        cover: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    // 7. Automatic Copyright Year
    const yearSpan = document.getElementById("copyrightYear");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 1. Dark Mode Toggle & Persistence
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = themeToggleBtn.querySelector("i");
    const currentTheme = localStorage.getItem("theme") || "light";

    if (currentTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        themeIcon.classList.replace("fa-moon", "fa-sun");
    }

    themeToggleBtn.addEventListener("click", () => {
        let theme = document.documentElement.getAttribute("data-theme");
        if (theme === "dark") {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
            themeIcon.classList.replace("fa-sun", "fa-moon");
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            themeIcon.classList.replace("fa-moon", "fa-sun");
        }
    });

    // Mobile Navigation Toggle
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        const icon = menuToggle.querySelector("i");
        if (navLinks.classList.contains("active")) {
            icon.classList.replace("fa-bars", "fa-xmark");
        } else {
            icon.classList.replace("fa-xmark", "fa-bars");
        }
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            const icon = menuToggle.querySelector("i");
            icon.classList.replace("fa-xmark", "fa-bars");
        });
    });

    // 2 & 4. Interactive Book Catalog & Real-Time Search Filter
    const catalogGrid = document.getElementById("bookCatalogGrid");
    const searchInput = document.getElementById("searchInput");
    const noResults = document.getElementById("noResults");

    function renderBooks(filteredBooks) {
        catalogGrid.innerHTML = "";
        if (filteredBooks.length === 0) {
            noResults.classList.remove("hidden");
            return;
        } else {
            noResults.classList.add("hidden");
        }

        filteredBooks.forEach(book => {
            const isAvailable = book.status === "Available";
            const badgeClass = isAvailable ? "available" : "borrowed";

            const card = document.createElement("div");
            card.className = "book-card";
            card.innerHTML = `
                <div>
                    <img src="${book.cover}" alt="${book.title}" class="book-cover-img">
                    <div class="book-header">
                        <span class="book-category">${book.category}</span>
                        <span class="availability-badge ${badgeClass}">${book.status}</span>
                    </div>
                    <div class="book-body">
                        <h3>${book.title}</h3>
                        <p class="book-author">by ${book.author}</p>
                        <p class="book-summary">${book.summary}</p>
                    </div>
                </div>
                <div class="book-footer">
                    <button class="btn-borrow" data-id="${book.id}">
                        ${isAvailable ? "Borrow Book" : "Reserve Book"}
                    </button>
                </div>
            `;
            catalogGrid.appendChild(card);
        });

        // Toggle book availability interaction
        document.querySelectorAll(".btn-borrow").forEach(button => {
            button.addEventListener("click", (e) => {
                const bookId = parseInt(e.target.getAttribute("data-id"));
                const targetBook = books.find(b => b.id === bookId);
                if (targetBook) {
                    if (targetBook.status === "Available") {
                        targetBook.status = "Borrowed";
                        alert(`You have successfully checked out "${targetBook.title}".`);
                    } else {
                        targetBook.status = "Available";
                        alert(`"${targetBook.title}" has been returned.`);
                    }
                    renderBooks(books.filter(b => 
                        b.title.toLowerCase().includes(searchInput.value.toLowerCase()) ||
                        b.author.toLowerCase().includes(searchInput.value.toLowerCase()) ||
                        b.category.toLowerCase().includes(searchInput.value.toLowerCase())
                    ));
                }
            });
        });
    }

    renderBooks(books);

    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        const filtered = books.filter(book => 
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query) ||
            book.category.toLowerCase().includes(query)
        );
        renderBooks(filtered);
    });

    // 6. Book Request / Contact Form Validation & Confirmation
    const requestForm = document.getElementById("requestForm");
    const formSuccess = document.getElementById("formSuccess");

    requestForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let isValid = true;

        const fullName = document.getElementById("fullName");
        const email = document.getElementById("email");
        const requestType = document.getElementById("requestType");
        const message = document.getElementById("message");

        // Full Name Validation
        const nameGroup = fullName.closest(".form-group");
        if (fullName.value.trim() === "") {
            nameGroup.classList.add("error");
            isValid = false;
        } else {
            nameGroup.classList.remove("error");
        }

        // Email Validation
        const emailGroup = email.closest(".form-group");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            emailGroup.classList.add("error");
            isValid = false;
        } else {
            emailGroup.classList.remove("error");
        }

        // Request Type Validation
        const typeGroup = requestType.closest(".form-group");
        if (requestType.value === "") {
            typeGroup.classList.add("error");
            isValid = false;
        } else {
            typeGroup.classList.remove("error");
        }

        // Message Validation
        const msgGroup = message.closest(".form-group");
        if (message.value.trim() === "") {
            msgGroup.classList.add("error");
            isValid = false;
        } else {
            msgGroup.classList.remove("error");
        }

        if (isValid) {
            requestForm.reset();
            formSuccess.classList.remove("hidden");
            setTimeout(() => {
                formSuccess.classList.add("hidden");
            }, 5000);
        }
    });
});