<script>
    export let isMobile = false;
  </script>
  
  <footer class={`footer ${isMobile ? 'mobile' : 'desktop'}`}>
    <div class="footer-content">
      <div class="footer-left">
        <p>© 2025 Scanlytics | Version 0.1</p>
        <nav>
          <a href="/">Privacy Policy</a> | 
          <a href="/">Terms of Use</a> | 
          <a href="/">Contact</a> | 
          <a href="/">Products</a>
        </nav>
      </div>
      <div class="footer-center">
        <p>For clinical usage, appropriate clinical qualification is required, <br> and users must ensure they have the necessary credentials and permissions <br>to access and interpret medical images.</p>
      </div>
      <div class="footer-right">
        <select>
          <option>English</option>
          <option>German</option>
          <option>French</option>
        </select>
      </div>
    </div>
  </footer>
  
  <style>
    .footer {
      height: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 20px;
      border-top: 1px solid #ccc;
      flex-direction: column; /* Default to column for mobile */
    }
  
    .footer.desktop {
      flex-direction: row; /* Row layout for desktop */
    }
  
    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
  
    .footer.mobile .footer-content {
      flex-direction: column;
      align-items: center;
    }
  
    .footer-left, .footer-right {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin: 10px 0;
    }

    .footer-center {
        align-items: flex-start;
    }
  
    .footer.desktop .footer-left, .footer.desktop .footer-right {
      flex: 1;
    }
  
    .footer.desktop .footer-center {
      flex: 2;
      text-align: center;
    }
  
    .footer-right {
      align-items: flex-end;
    }
  
    nav a {
      margin: 0 5px;
      text-decoration: none;
      color: #333;
    }
  
    nav a:hover {
      text-decoration: underline;
    }
  
    select {
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  </style>
  