<script>	
    import { page } from '$app/stores';

    function redirectUser(){ 
    window.location.href = 'https://calendly.com/tobias-wedel-code/30min';

    }
</script>

<nav>
    <div class="logoArea">
        <img src="/logow.jpg" alt="Logo" height="30" width="28" />
        <h2>Scanlytics</h2>
    </div>
    <div class="navbar">
        <a href="/" class={$page.url.pathname === '/' ? 'active' : ''}>Home</a>
        <a href="/Vision/" class={$page.url.pathname.startsWith('/Vision') ? 'active' : ''}>Vision</a>
        <a href="/Technology/" class={$page.url.pathname.startsWith('/Technology') ? 'active' : ''}>Technology</a>
        <a href="/About/" class={$page.url.pathname.startsWith('/About') ? 'active' : ''}>About</a>
        <button class="bookCallBtn" on:click={redirectUser}>Book a Call</button>
    </div>
</nav>

<style>
    .logoArea {
        height: 100%;
        width: 8%;
        display: flex;
        align-items: center;
        gap: 8%;
        padding-left: 1%;
        font-family: system-ui;
        color: white;
    }

    nav {
        display: flex;
        width: 100%;
        height: 5%;
        align-items: center;
        justify-content: space-between;
    }

    .navbar {
        width: 27%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 1%;
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
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid black;
        border-radius: 40px;
        color: rgb(10, 9, 9);
        font-family: system-ui;
        font-size: 12px;
        cursor: pointer;
    }

    .visionBtn {
        color: white;
    }


</style>