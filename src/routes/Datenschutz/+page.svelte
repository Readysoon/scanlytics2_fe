<script lang="ts">
	import Footer from "../Footer.svelte";
  	import Header from "../Header.svelte";

</script>

<main>

	<Header />

	<div class="mainSection">
        <h1>Datenschutz auf einen Blick</h1>
        
        <h2>1. Allgemeine Hinweise</h2>
        <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Detaillierte Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.</p>

        <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong>

        <p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.</p>

        <strong>Wie erfassen wir Ihre Daten?</strong>
        <p>Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
        Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.</p>

        <strong>Wofür nutzen wir Ihre Daten?</strong>
        <p>Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.</p>

        <h3>Ihre Rechte</h3>

        <p>Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.</p>

        <h2>2. Hosting</h2>
        Unsere Website wird bei einem externen Dienstleister gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Dies kann insbesondere IP-Adressen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, umfassen.

        <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>

        <strong>Datenschutz</strong>
        Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.

        <strong>Speicherdauer</strong>
        Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen stellen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben.

        <h2>4. Datenerfassung auf dieser Website</h2>

        <strong>Cookies</strong>
        Unsere Internetseiten verwenden sogenannte "Cookies". Cookies sind kleine Datenpakete und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt.

        <strong>Server-Log-Dateien</strong>
        Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:

        - Browsertyp und Browserversion
        - Verwendetes Betriebssystem
        - Referrer URL
        - Hostname des zugreifenden Rechners
        - Uhrzeit der Serveranfrage
        - IP-Adresse

        Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.

        <h2>5. Analyse-Tools und Werbung</h2>
        Wir nutzen auf unserer Website Analysetools, um das Nutzerverhalten besser zu verstehen. Hierfür setzen wir unter anderem **Mixpanel** ein. Die Verarbeitung der Daten erfolgt nur nach Ihrer ausdrücklichen Einwilligung.

        <h2>6. Plugins und Tools</h2>
        Auf unserer Website werden Dienste Dritter eingebunden, um Funktionen bereitzustellen oder das Nutzererlebnis zu verbessern. Dazu können z. B. Kartendienste oder externe Schriftarten gehören.

        <h2>7. Rechte der betroffenen Person</h2>
        Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf:

        - Auskunft über Ihre gespeicherten personenbezogenen Daten
        - Berichtigung unrichtiger Daten
        - Löschung Ihrer Daten, sofern keine gesetzliche Aufbewahrungspflicht besteht
        - Einschränkung der Verarbeitung Ihrer Daten
        - Widerspruch gegen die Verarbeitung Ihrer Daten
        - Datenübertragbarkeit

        <h2>8. Kontakt</h2>
        <strong>Falls Sie Fragen zum Datenschutz haben, können Sie uns unter folgender E-Mail-Adresse kontaktieren: <a href="mailto:tobias.wedel@code.berlin">tobias.wedel@code.berlin</a></strong>

       <p>--- Diese Datenschutzerklärung wurde zuletzt aktualisiert am 28.03.2025.</p>
	</div>

	<Footer />
</main>

<style>
	main {
		background-color: rgb(0, 0, 0);
		height: 100vh;
		overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: auto;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE and Edge */
	}

    h1, h2, h3 {
        margin-top: 2em;
        margin-bottom: 1em;
    }

    h1, h2, h3, strong {
        text-align: center;
    }

    strong {
        margin-top: 1em;
        margin-bottom: .5em;
    }

	.mainSection {
        width: 60%;
		margin-top: 30px;
        padding-top: 100px;
        padding-bottom: 300px;
		display: flex;
        flex-direction: column;
		align-items: center;
        color: white;
        
	}

	@media (max-width: 768px) {
		/* Force content to be scrollable */
		:global(body) {
			overflow-y: auto !important;
		}

        .mainSection {
            height: auto !important;
            overflow-y: auto !important;
        }
        
        main {
            height: auto !important; 
            overflow-y: auto !important;
        }
    }
</style>
