import React from "react";
export default function AddOrDeleteGoods(props) {
    const { setGoods, goodsData, goods, setGoodsData, setShow } = props;
    let handleAddGoodsSubmit = async (e) => {
        e.preventDefault();

        try {
            let res = await fetch("/api/Goods", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    name: goods,
                }),
            });
            if (res.status === 200) {
                setGoods("");
            }
        } catch (err) {
            console.log(err);
        }
        setShow(false);
        setGoodsData([]);
    };

    let deleteGoods = async () => {
        try {
            let res = await fetch(`/api/Goods/${goods}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    name: goods,
                }),
            });
            if (res.status === 200) {
            }
        } catch (err) {
            console.log(err);
        }
        setGoodsData([]);
        setShow(false);
    };
    let cancel = () => {
        setShow(false);
    };

    const setGoodsForDelete = (toDelete) => {
        setGoods(toDelete);
    };
    return (
        <div className="blackout">
            <div className="popup">
                <form className="form" onSubmit={handleAddGoodsSubmit}>
                    <div className="formElement">
                        <label>
                            Add new goods:
                            <input className="form-control" type="text" onChange={(e) => setGoods(e.target.value)} />
                        </label>
                        <input className="btn btn-primary addOrDeleteGoodsBtn" type="submit" value="Submit" />
                        <label>
                            Delete this record of goods:
                            <select className="form-select" name="Goods" onChange={(e) => setGoodsForDelete(e.target.value)}>
                                <option value="" disabled selected hidden>select goods</option>
                                {goodsData.map(goods => (<option key={`goods${goods.id}`} value={goods.id} >{goods.name} </option>))}
                            </select>
                            <button className="btn btn-primary addOrDeleteGoodsBtn" onClick={(e) => { e.preventDefault(); deleteGoods(); }}>Delete</button>
                        </label>
                        <label>
                            <button className="btn btn-primary addOrDeleteGoodsBtn" onClick={(e) => { e.preventDefault(); cancel(); }}>Cancel</button>
                        </label>
                    </div>
                </form>
            </div>
        </div>)
}