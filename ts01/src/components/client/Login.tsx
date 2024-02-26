export const Login: React.FC = () => {

    const handleSubmit =()=>{
        alert("dd")
    }
    return (
        < form onSubmit={handleSubmit} autoComplete="off">
            <div className="row mt-5">
                <div className="col-lg-6 col-md-8 offset-md-2 offset-lg-3">
                <input type="email"  name="email" required   className="form-control"/>
                </div>
            </div>
            <div className="row mt-3">
            <div className="col-lg-6 col-md-8 offset-md-2 offset-lg-3">
                    <input type="password" className="form-control" />
                </div>
            </div>
            <div className="row mt-3 aling-items-center">
            <div className="col-lg-6 col-md-8 offset-md-2 offset-lg-3">

                    <div className="form-check form-switch form-check-reverse">
                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckReverse" />
                        <label className="form-check-label" htmlFor="flexSwitchCheckReverse">RememberID</label>
                    </div>
                </div>
            </div>
            <div className="row mt-3">
            <div className="col-lg-6 col-md-8 offset-md-2 offset-lg-3">
                    <button type="submit" className="btn btn-primary w-100">login</button>
                </div>
            </div>
        </form>
    );
}