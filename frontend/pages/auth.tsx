import { adapterComponentUseCase } from "adapters/adapterComponents";
import { useCaseAuth } from "domains/useCase/auth/useCase.Auth";
import { NextPage } from "next";

const Auth: NextPage = () => {
  const useCasePoints = adapterComponentUseCase(useCaseAuth)
  const {error} = useCasePoints.data
  const { onSubmitAuth} = useCasePoints.handlers

  return (
    <div className="hold-transition login-page">
    <div className="login-box">
    
    
    <div className="card">
      <div className="card-body login-card-body">
        <p className="login-box-msg">Sign in to start your session</p>

        <form method="post" onSubmit={onSubmitAuth}>
          <div className="input-group mb-3">
            <input type="text" name="login" className="form-control" placeholder="Email" />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-envelope"></span>
              </div>
            </div>
          </div>
          <div className="input-group mb-3">
            <input type="password" className="form-control" placeholder="Password" />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-lock"></span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-8">
              
            </div>
            
            <div className="col-4">
              <button type="submit" className="btn btn-primary btn-block">Sign In</button>
            </div>
            
          </div>
        </form>
        {
          error && <div className="error">ошибка авторизации</div>
        }

      </div>
      
    </div>
  </div>
  </div>
  )
}
export default Auth