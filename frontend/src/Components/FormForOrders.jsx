export default function FormForOrders(props) {
    const { handleSubmit, companyData, company, loadingPlace, unloadingPlace, driver, goods, driverData, setCompany, setDriver, setLoadingPlace, setUnloadingPlace, goodsData, setGoods, setShow } = props;

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-group justify-content-center d-flex">
                <select className="form-select orderDropdown mx-auto" value={company} name="company" onChange={(e) => setCompany(e.target.value)}>
                    <option value="" disabled >select company</option>
                    {companyData.map(company => (<option key={`company${company.id}`} value={company.id} >{company.name}</option>))}
                </select>
            </div>
            <div className="form-group">
                <label>
                    Loading address:
                    <input type="text" className="form-control" value={loadingPlace} onChange={(e) => setLoadingPlace(e.target.value)} />
                </label>
            </div>
            <div className="form-group">
                <label>
                    Unloading address:
                    <input type="text" className="form-control" value={unloadingPlace} onChange={(e) => setUnloadingPlace(e.target.value)} />
                </label>
            </div>
            <div className="form-group justify-content-center d-flex">
                <select className="form-select orderDropdown mx-auto" value={driver} name="Driver" onChange={(e) => setDriver(e.target.value)}>
                    <option value="" disabled hidden>select driver</option>
                    {driverData.map(driver => (<option key={`driver${driver.id}`} value={driver.id} >{driver.name}</option>))}
                </select>
            </div>
            <div className="form-group justify-content-center d-flex">
                <select className="form-select orderDropdown mx-auto" value={goods} name="Goods" onChange={(e) => setGoods(e.target.value)}>
                    <option value="" disabled >select goods</option>
                    {goodsData.map(goods => (<option key={`goods${goods.id}`} value={goods.id} >{goods.name} </option>))}
                </select>
            </div>
            <button className="btn btn-primary" onClick={(e) => { e.preventDefault(); setShow(true) }}>Add or delete goods</button>
            <br></br>
            <input type="submit" value="Submit" className={company && loadingPlace && unloadingPlace && driver && goods != "" ? "btn btn-primary" : "btn btn-primary disabled"} />
        </form>
    )
}