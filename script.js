document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ENABLE JAVASCRIPT ANIMATIONS
    ===================================================== */

    document.documentElement.classList.add("js-enabled");


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "animate-in"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.08,

                    rootMargin:
                        "0px 0px -40px 0px"
                }
            );


        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add(
                "animate-in"
            );

        });

    }


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const header =
        document.getElementById("header");


    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 40) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    updateHeader();


    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    const scrollProgress =
        document.getElementById(
            "scrollProgress"
        );


    function updateScrollProgress() {

        if (!scrollProgress) {
            return;
        }

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        if (documentHeight <= 0) {

            scrollProgress.style.width =
                "0%";

            return;

        }


        const percentage =
            (scrollTop / documentHeight) *
            100;


        scrollProgress.style.width =
            `${Math.min(
                percentage,
                100
            )}%`;

    }


    window.addEventListener(
        "scroll",
        updateScrollProgress,
        {
            passive: true
        }
    );


    updateScrollProgress();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuButton =
        document.getElementById(
            "menuButton"
        );

    const navLinks =
        document.getElementById(
            "navLinks"
        );


    if (menuButton && navLinks) {

        menuButton.addEventListener(
            "click",
            () => {

                const isOpen =
                    navLinks.classList.toggle(
                        "active"
                    );


                menuButton.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );


                const icon =
                    menuButton.querySelector(
                        "i"
                    );


                if (!icon) {
                    return;
                }


                if (isOpen) {

                    icon.classList.remove(
                        "fa-bars"
                    );

                    icon.classList.add(
                        "fa-xmark"
                    );

                } else {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }
        );


        navLinks
            .querySelectorAll("a")
            .forEach((link) => {

                link.addEventListener(
                    "click",
                    () => {

                        navLinks.classList.remove(
                            "active"
                        );

                        menuButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );


                        const icon =
                            menuButton.querySelector(
                                "i"
                            );


                        if (icon) {

                            icon.classList.remove(
                                "fa-xmark"
                            );

                            icon.classList.add(
                                "fa-bars"
                            );

                        }

                    }
                );

            });

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navItems =
        document.querySelectorAll(
            ".nav-links a"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const sectionObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            const id =
                                entry.target
                                    .getAttribute(
                                        "id"
                                    );


                            navItems.forEach(
                                (link) => {

                                    link.classList.remove(
                                        "active"
                                    );


                                    if (
                                        link.getAttribute(
                                            "href"
                                        ) ===
                                        `#${id}`
                                    ) {

                                        link.classList.add(
                                            "active"
                                        );

                                    }

                                }
                            );

                        }
                    );

                },
                {
                    rootMargin:
                        "-35% 0px -55% 0px"
                }
            );


        sections.forEach(
            (section) => {

                sectionObserver.observe(
                    section
                );

            }
        );

    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;


                    const targetPosition =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerHeight -
                        15;


                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });

                }
            );

        });


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backToTop =
        document.getElementById(
            "backToTop"
        );


    function updateBackToTop() {

        if (!backToTop) {
            return;
        }


        if (window.scrollY > 500) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateBackToTop,
        {
            passive: true
        }
    );


    updateBackToTop();


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       CERTIFICATE MODAL
    ===================================================== */

    const certificateModal =
        document.getElementById(
            "certificateModal"
        );

    const modalImage =
        document.getElementById(
            "modalImage"
        );

    const modalTitle =
        document.getElementById(
            "modalTitle"
        );

    const modalClose =
        document.getElementById(
            "modalClose"
        );


    const certificateButtons =
        document.querySelectorAll(
            ".certificate-image"
        );


    function openCertificate(
        imagePath,
        title
    ) {

        if (
            !certificateModal ||
            !modalImage
        ) {
            return;
        }


        modalImage.src =
            imagePath;

        modalImage.alt =
            `${title} certificate preview`;


        if (modalTitle) {

            modalTitle.textContent =
                title;

        }


        certificateModal.classList.add(
            "active"
        );


        certificateModal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow =
            "hidden";

    }


    function closeCertificate() {

        if (!certificateModal) {
            return;
        }


        certificateModal.classList.remove(
            "active"
        );


        certificateModal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow =
            "";

    }


    certificateButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    const image =
                        button.dataset
                            .certificate;


                    const title =
                        button.dataset
                            .title ||
                        "Certificate";


                    if (!image) {
                        return;
                    }


                    openCertificate(
                        image,
                        title
                    );

                }
            );

        }
    );


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeCertificate
        );

    }


    if (certificateModal) {

        certificateModal
            .querySelectorAll(
                "[data-close-modal]"
            )
            .forEach((element) => {

                element.addEventListener(
                    "click",
                    closeCertificate
                );

            });

    }


    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                certificateModal &&
                certificateModal.classList.contains(
                    "active"
                )
            ) {

                closeCertificate();

            }

        }
    );


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm =
        document.getElementById(
            "contactForm"
        );

    const formMessage =
        document.getElementById(
            "formMessage"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                if (!formMessage) {
                    return;
                }


                const nameInput =
                    document.getElementById(
                        "name"
                    );


                const name =
                    nameInput
                        ? nameInput.value.trim()
                        : "";


                const displayName =
                    name || "there";


                formMessage.textContent =
                    `Thank you, ${displayName}! Your message has been prepared.`;


                formMessage.classList.add(
                    "show"
                );


                contactForm.reset();

            }
        );

    }


    /* =====================================================
       IMAGE ERROR PROTECTION
    ===================================================== */

    document
        .querySelectorAll(
            "img"
        )
        .forEach((image) => {

            image.addEventListener(
                "error",
                () => {

                    image.classList.add(
                        "image-error"
                    );

                }
            );

        });

});