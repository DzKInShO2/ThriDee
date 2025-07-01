<script>

</script>

  <div class="card">
    <div class="card-header">
      <h4><i class="fas fa-user-plus" style="margin-right: 0.5rem"></i> Register</h4>
    </div>
    <div class="card-body">
      <form method="POST" action="/login">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" name="username" required />
          <small>Choose a unique username (3–20 characters)</small>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required />
          <small>Password must be at least 8 characters</small>
        </div>

        <div class="form-group">
          <label for="confirm_password">Confirm Password</label>
          <input type="password" id="confirm_password" name="confirm_password" required />
        </div>

        <button type="submit" class="btn-primary">
          <i class="fas fa-user-plus" style="margin-right: 0.3rem"></i> Register
        </button>

        <p class="form-footer">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  </div>
