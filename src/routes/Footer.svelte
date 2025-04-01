<script lang="ts">
    	let impressState: boolean = false;
        let DatenschutzState: boolean = false;

    		const handleImpressumClick = () => { 
			impressState = !impressState
		}
	
		
		const handleDatenschutzClick = () => { 
			DatenschutzState = !DatenschutzState
		}
</script>

{#if DatenschutzState}
<div class="overlay">
    <div class="DatenSchutzCard">
		<div class="DatenSchutzCardHead">
			<div class="impressumCardTitleSection">
					<p class="impressumCardTitle">Datenschutz</p>
				</div>
			<div class="impressumCloseBtn">
				<p class="closebtn" on:click={handleDatenschutzClick}>x</p>
			</div>
		</div>
    </div>
</div>
{/if}

{#if impressState}
	<div class="overlay">
			<div class="Card">
					<div class="impressumCardHead">
					<div class="impressumCardTitleSection">
							<p class="impressumCardTitle">Impressum</p>
						</div>
					<div class="impressumCloseBtn">
						<p class="closebtn" on:click={handleImpressumClick}>x</p>
					</div>
					</div>
					<div class="impressumCardBody">
					Name: Phillipp Gallaschik
					<br>
					Adresse: Mierendorffstr. 12, c/o Zekl, 10589 Berlin
					<br>
					Telefon: 01739140346
					<br>
					E-Mail: philipp.gallaschik@code.berlin
					</div>
			</div>
	</div>
{/if}

<footer class="footerSection">
	<div class="footer-left-box">
		<p class="footer-text left">© 2025 Scanlytics | Version 0.2</p>
	</div>

	<div class="footer-center-box">
		<div class="desktop-view">
			<p class="footer-text right" on:click={handleImpressumClick}>Impressum</p> 
			<span class="separator-desktop">|</span>
			<div class="footer-text right" on:click={() => window.location.href = '/Datenschutz'}>Datenschutz</div>
		</div>
		
		<div class="mobile-view">
			<p class="footer-text right" on:click={handleImpressumClick}>Impressum</p>
			<p class="footer-text separator">-</p>
			<div class="footer-text right" on:click={() => window.location.href = '/Datenschutz'}>Datenschutz</div>
		</div>
	</div>
</footer>

<style>
    .overlay{
		background-color: rgba(0, 0, 0, 0.664);
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: 100%;
		width: 100%;
		z-index: 3;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.Card{
		background-color: white;
		height: 20%;
		width: 30%;
		border-radius: 7px;
	}

    .impressumCardHead{
		height: 20%;
		width: 100%;
		display: flex;
		/* background-color: green; */
		border-bottom: 1px solid rgba(0, 0, 0, 0.259);
	}

    .DatenSchutzCard{
		background-color: white;
		height: 70%;
		width: 40%;
		border-radius: 7px;
	}

	.DatenSchutzCardHead{
		height: 7%;
		width: 100%;
		display: flex;
		/* background-color: green; */
		border-bottom: 1px solid rgba(0, 0, 0, 0.259);
	}

	.impressumCardTitleSection{
		height: 100%;
		width: 90%;
		/* background-color: orange; */
		display: flex;
		align-items: center;
		padding-left: 1rem;
	}

	.impressumCardTitle{
		font-size: 19px;
		font-weight: 700;
		font-family: system-ui;
	}

	.impressumCloseBtn{
		height: 100%;
		width: 10%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.closebtn{
		font-size: 27px;
		font-weight: 700;
		font-family: system-ui;
		color: red;
		cursor: pointer;
	}

	.impressumCardBody{
		padding: 1rem;
	}

    .footerSection {
        width: 100%;
        padding: 1em;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .footer-left-box {
        display: flex;
        align-items: center;
    }

	.footer-text {
		color: white;
		font-family: system-ui;
		font-size: 15px;
		opacity: 0.4;
	}

	.footer-text.right{
		cursor: pointer;
	}

	.footer-center {
		color: black;
		width: 40%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.footer-center-text {
		color: white;
		font-family: system-ui;
		font-size: 12px;
		opacity: 0.4;
		text-align: end;
	}
	
    .footer-center-box {
        display: flex;
        align-items: center;
        gap: 1%;
    }

    /* Default styles for desktop */
    .mobile-view {
        display: none;
    }

    .desktop-view {
        display: flex;
        align-items: center;
        gap: 8px;
    }

	.separator-desktop {
        color: white;
        opacity: 0.4;
        font-family: system-ui;
        font-size: 12px;
    }

    /* Media query for mobile devices */
    @media screen and (max-width: 1024px) {
		.footerSection {
			display: none;
		}

        .mobile-view {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .desktop-view {
            display: none;
        }

        .footer-text.separator {
            color: white;
            opacity: 0.4;
            margin: 2px 0;
        }
        
        .footer-center-box {
            text-align: center;
        }
    }

</style>