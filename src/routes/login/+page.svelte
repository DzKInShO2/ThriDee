<script>

</script>

  <div class="card">
    <div class="card-header">
      <h4><i class="fas fa-user-plus" style="margin-right: 0.5rem"></i> Login</h4>
    </div>
      <div class="card-body">
        <form action="/" method="POST">
          <div class="form-group">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" name="username" required>
            <small>Enter your username</small>
          </div>
          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" name="password" required>
            <small>Enter your password</small>
          </div>
          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-primary">
              <i class="fas fa-sign-in-alt me-1"></i> Login
            </button>
            <p class="mt-3">
              Don't have an account? <a href="/register">Register</a>
            </p>
          </div>
        </form>
      </div>
  </div>

