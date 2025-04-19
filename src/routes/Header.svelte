<script lang="ts">	
    import { page } from '$app/stores';
    import { onMount } from 'svelte';

    function redirectUser(){ 
        window.location.href = 'https://calendly.com/tobias-wedel-code/30min';
    }

    // Mobile menu state
    let mobileMenuOpen = false;
    let isMobile = false;

    // Toggle mobile menu
    function toggleMobileMenu() {
        mobileMenuOpen = !mobileMenuOpen;
    }

    // Check if device is mobile
    onMount(() => {
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        
        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    });

    function checkIfMobile() {
        isMobile = window.innerWidth <= 768;
        if (!isMobile) {
            mobileMenuOpen = false;
        }
    }

</script>

<nav>
    <div class="logoArea">
        <img src="/logow.jpg" alt="Logo" height="30" width="28" />
        <h2>Scanlytics</h2>
    </div>

    <!-- Navigation links -->
    <div class="navbar" class:mobile-menu={isMobile} class:open={mobileMenuOpen}>
        <a href="/" class={$page.url.pathname === '/' ? 'active' : ''}>Home</a>
        <a href="/Vision/" class={$page.url.pathname.startsWith('/Vision') ? 'active' : ''}>Vision</a>
        <a href="/Technology/" class={$page.url.pathname.startsWith('/Technology') ? 'active' : ''}>Technology</a>
        <a href="/About/" class={$page.url.pathname.startsWith('/About') ? 'active' : ''}>About</a>
        <!-- <a href="/Tests/" class={$page.url.pathname.startsWith('/Tests') ? 'active' : ''}>Tests</a> -->

        <button class="bookCallBtn" on:click={redirectUser}>Book a Call</button>
    </div>

    <!-- Hamburger menu button for mobile -->
    {#if isMobile}
        <div class="hamburger-menu" on:click={toggleMobileMenu}>
            <div class="hamburger-icon" class:open={mobileMenuOpen}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    {/if}
</nav>

<style>
    .logoArea {
        height: 100%;
        width: 8%;
        min-width: 120px;
        display: flex;
        align-items: center;
        gap: 8%;
        padding-left: 10px;
        font-family: system-ui;
        color: white;
    }

    nav {
        display: flex;
        width: 100%;
        height: 5%;
        min-height: 50px;
        align-items: center;
        justify-content: space-between;
        position: relative;
    }

    .navbar {
        width: 500px;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    a {
        text-decoration: none;
        color: rgb(77, 77, 77);
        font-weight: 500;
        font-family: system-ui;
    }

    .active {
        color: white !important;
    }

    .bookCallBtn {
        width: 20%;
        height: 50%;
        min-width: 80px;
        min-height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid black;
        border-radius: 40px;
        color: rgb(10, 9, 9);
        font-family: system-ui;
        font-size: 12px;
        cursor: pointer;
        background-color: white;
    }

    /* Hamburger menu styles */
    .hamburger-menu {
        display: none;
        cursor: pointer;
        z-index: 1001;
    }

    .hamburger-icon {
        width: 30px;
        height: 20px;
        position: relative;
    }

    .hamburger-icon span {
        display: block;
        position: absolute;
        height: 3px;
        width: 100%;
        background: white;
        border-radius: 3px;
        opacity: 1;
        left: 0;
        transform: rotate(0deg);
        transition: .25s ease-in-out;
    }

    .hamburger-icon span:nth-child(1) {
        top: 0px;
    }

    .hamburger-icon span:nth-child(2) {
        top: 8px;
    }

    .hamburger-icon span:nth-child(3) {
        top: 16px;
    }

    .hamburger-icon.open span:nth-child(1) {
        top: 8px;
        transform: rotate(135deg);
    }

    .hamburger-icon.open span:nth-child(2) {
        opacity: 0;
        left: -60px;
    }

    .hamburger-icon.open span:nth-child(3) {
        top: 8px;
        transform: rotate(-135deg);
    }

    /* Mobile styles */
    @media (max-width: 768px) {
        .hamburger-menu {
            display: block;
            position: absolute;
            right: 10px;
        }

        .navbar {
            display: none;
            width: 100%;
            height: auto;
            padding: 0;
        }

        .navbar.mobile-menu {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 50px;
            left: 0;
            background-color: rgba(0, 0, 0, 0.9);
            width: 100%;
            padding: 0;
            z-index: 1000;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease-in-out;
        }

        .navbar.mobile-menu.open {
            max-height: none;
            padding: 15px 0;
        }

        .navbar.mobile-menu a {
            padding: 15px;
            width: 100%;
            text-align: center;
            margin: 5px 0;
        }

        .navbar.mobile-menu .bookCallBtn {
            width: 80%;
            margin: 15px auto;
        }
    }
</style>
