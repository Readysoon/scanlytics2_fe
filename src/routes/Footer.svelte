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
            <div class="impressumCardBody">
                **1. Datenschutz auf einen Blick**

### Allgemeine Hinweise

Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Detaillierte Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.

### Datenerfassung auf unserer Website

**Wer ist verantwortlich für die Datenerfassung auf dieser Website?**
Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.

**Wie erfassen wir Ihre Daten?**
Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.

Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.

**Wofür nutzen wir Ihre Daten?**
Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.

### Ihre Rechte

Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.

**2. Hosting**
Unsere Website wird bei einem externen Dienstleister gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Dies kann insbesondere IP-Adressen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, umfassen.

**3. Allgemeine Hinweise und Pflichtinformationen**

**Datenschutz**
Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.

**Speicherdauer**
Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen stellen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben.

**4. Datenerfassung auf dieser Website**

**Cookies**
Unsere Internetseiten verwenden sogenannte "Cookies". Cookies sind kleine Datenpakete und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt.

**Server-Log-Dateien**
Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:

- Browsertyp und Browserversion
- Verwendetes Betriebssystem
- Referrer URL
- Hostname des zugreifenden Rechners
- Uhrzeit der Serveranfrage
- IP-Adresse

Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.

**5. Analyse-Tools und Werbung**
Wir nutzen auf unserer Website Analysetools, um das Nutzerverhalten besser zu verstehen. Hierfür setzen wir unter anderem **Mixpanel** ein. Die Verarbeitung der Daten erfolgt nur nach Ihrer ausdrücklichen Einwilligung.

**6. Plugins und Tools**
Auf unserer Website werden Dienste Dritter eingebunden, um Funktionen bereitzustellen oder das Nutzererlebnis zu verbessern. Dazu können z. B. Kartendienste oder externe Schriftarten gehören.

**7. Rechte der betroffenen Person**
Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf:

- Auskunft über Ihre gespeicherten personenbezogenen Daten
- Berichtigung unrichtiger Daten
- Löschung Ihrer Daten, sofern keine gesetzliche Aufbewahrungspflicht besteht
- Einschränkung der Verarbeitung Ihrer Daten
- Widerspruch gegen die Verarbeitung Ihrer Daten
- Datenübertragbarkeit

**8. Kontakt** Falls Sie Fragen zum Datenschutz haben, können Sie uns unter folgender E-Mail-Adresse kontaktieren: [tobias.wedel@code.berlin](mailto:tobias.wedel@code.berlin).

---

Diese Datenschutzerklärung wurde zuletzt aktualisiert am 26.02.2024.
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
						Telefon: 017683470990
						<br>
						E-Mail: tobias.wedel@code.berlin
					 </div>
			 </div>
		</div>
	{/if}

<footer class="footerSection">
    <div class="footer-content">
        <div class="footer-left">
            <div class="footer-left-box">
                <p class="footer-left-text">© 2025 Scanlytics | Version 0.2</p>

            </div>

            <div class="footer-center-box">
                <p  class="footer-right-text" on:click={handleImpressumClick}>Impressum |</p> 
                <p  class="footer-right-text" on:click={handleDatenschutzClick}>Datenschutz</p>
           </div>
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
		height: 13%;
		padding: 1em;
	}

	.footer-content {
		width: 100%;
		height: 100px;
		display: flex;
		justify-content: space-between;
		/* background-color: green; */

	}

	.footer-left {
		color: black;
		width: 100%;
		height: 100%;
		display: flex;
		/* flex-direction: column; */
		justify-content: space-between;

		/* background-color: orange; */


	}

	.footer-left-box{
		/* background-color: rgb(77, 76, 75); */
		display: flex;
		align-items: end;
		justify-content: flex-end;

	}

	.footer-left-text {
		color: white;
		font-family: system-ui;
		font-size: 12px;
		opacity: 0.4;
	}

	.footer-right-text {
		color: white;
		font-family: system-ui;
		font-size: 12px;
		opacity: 0.4;
		cursor: pointer;
	}

	

	.footer-center {
		color: black;
		/* width: 30%;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: end; */
		color: black;
		width: 40%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		/* background-color: red; */
	}

	.footer-center-text {
		color: white;
		font-family: system-ui;
		font-size: 12px;
		opacity: 0.4;
		text-align: end;
	}

	.footer-center-box{
		/* background-color: green; */
		height: 100%;
		width: 25%;
		display: flex;
		align-items: end;
		justify-content: flex-end;
		/* padding-right: 2%; */
		gap: 1%;
	}
</style>