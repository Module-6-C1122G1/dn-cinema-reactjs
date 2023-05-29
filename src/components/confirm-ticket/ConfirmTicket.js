import "./ConfirmTicket.css"
import Footer from "../common/footer/Footer";
import Header from "../common/header/Header";
import React, {useEffect, useState} from "react";
import {Formik, Form, Field} from "formik";
import {checkDiscount, findByIdSeat, getCustomer, pay} from "../../service/TicketService";

export function ConfirmTicket(props) {
    const {filmData, listSelectingData} = props;
    const useName = localStorage.getItem("username");
    const [seats, setSeat] = useState([]);
    const [price, setPrice] = useState(0);
    const [discounts, setDiscount] = useState({});
    const [customer, setCustomer] = useState({});
    useEffect(() => {
        const fetchApi = async () => {
            const listSeat = [];
            let prices = 0;
            await listSelectingData.forEach((seat) => {
                const result = findByIdSeat(seat);
                if (result.typeSeat.idTypeSeat === 1) {
                    prices += filmData.film.normalSeatPrice;
                } else {
                    prices += filmData.film.vipSeatPrice;
                }
                listSeat.push(findByIdSeat(seat))
            })
            const customers = await getCustomer(useName)
            setCustomer(customers)
            setPrice(prices);
            setSeat(listSeat);
        }
        fetchApi();
    }, [])
    const handleDiscount = async () => {
        const discount = document.getElementById("nameDiscount").value;
        if (discount.trim !== null) {
            const result = await checkDiscount();
            const prices = result.percentDiscount * price / 100 + price;
            setPrice(prices);
            setDiscount(discount);
        }
    }
    return (
        <>
            <Header/>
            <Formik
                initialValues={{
                    idCustomer: customer.idCustomer,
                    idFilm: filmData.film.idFilm,
                    listSeat: seats,
                    discount: discounts.idDiscount,
                    price: price
                }}
                onSubmit={(values) => {
                    const save = async () => {
                        await pay(values)
                        alert("ok")
                    }
                    save();
                }}
            >
                <Form>
                    <Field type="hidden" disable name='idCustomer'/>
                    <Field type="hidden" disable name='idFilm'/>
                    <Field type="hidden" disable name='discount'/>
                    <Field type="hidden" disable name='price'/>
                    {seats.map((seat, index) => (
                        <Field type="hidden" as="checkbox" key={index} name="listSeat" value={seat}/>
                    ))}
                    <div className="container">
                        <div className="row">
                            <div className="col-md-9" style={{background: "#f26b38", height: "auto"}}>
                                <h1 style={{color: "white"}}>Vui lòng thanh toán</h1>
                                <table className="table" style={{background: "white"}}>
                                    <tbody>
                                    <tr>
                                        <td style={{width: "25%"}}>Hình thức thanh toán</td>
                                        <td>
                                            <select style={{width: "40%"}}>
                                                <option>Chọn loại thẻ</option>
                                                <option>Vé điện tử MOMO</option>
                                                <option>ZaloPay: Bạn mới 9k/ vé</option>
                                                <option>VNPAY</option>
                                                <option>HSBC/Payoo - ATM/VISA/MASTER/JCB/QRCODE</option>
                                                <option>Ví ShopeePay</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Họ và tên</td>
                                        <td>
                                            <input
                                                type="text"
                                                value={token.name}
                                                disabled
                                                style={{width: "40%", height: 40}}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>
                                            <input
                                                type="text"
                                                value={token.email}
                                                style={{width: "40%"}}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Số điện thoại</td>
                                        <td>
                                            <input
                                                type="text"
                                                value={token.phone}
                                                style={{width: "40%"}}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Mã giảm giá</td>
                                        <td>
                                            <input
                                                type="text"
                                                style={{width: "40%"}}
                                                id="nameDiscount"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td/>
                                        <td>
                                            <button type="submit" onClick={() => handleDiscount} style={{width: "40%"}}>
                                                Áp dụng
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td/>
                                        <td>
                                            <p style={{fontSize: 11, width: "40%"}}>
                                                (*) Bằng việc click/chạm vào THANH TOÁN, bạn đã xác nhận hiểu rõ
                                                các <b>Quy Định Giao Dịch Trực Tuyến</b> của Galaxy Cinema.
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td/>
                                        <td>
                                            <button type="submit" style={{width: "18%", marginRight: "4%"}}>
                                                Quay lại
                                            </button>
                                            <button type="submit">Thanh toán</button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-md-3">
                                <div galaxy-scroll-follow-content="" className="ticket-header">
                                    <section className="ticket-feature">
                                        <article
                                            ng-init='movieId="dac2a8f3-1540-4f79-a8fb-1839177b2b77";cinemaId="1003";sessionId="338112"'
                                            className="row"
                                        >
                                            <div style={{textAlign: "center"}} className="col-md-12">
                                                <img
                                                    src={filmData.film.imgFilm}
                                                    className="loading"
                                                    data-was-processed="true"
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <div className="ticket-detail">
                                                    <h2 className="ticket-title upper-text">{filmData.film.nameFilm}</h2>
                                                    <div className="ticket-icon">
                  <span>
                    <span className="age-rating">T16</span>
                  </span>
                                                        <span>
                    <span className="notice">
                      (*) Phim chỉ dành cho khán giả từ 16 tuổi trở lên
                    </span>
                  </span>
                                                    </div>
                                                    <div className="ticket-info">
                                                        <div className="dotted-line">
                                                            <b>Rạp: &nbsp;</b>Galaxy Tân Bình&nbsp; | RAP 5&nbsp;
                                                        </div>
                                                        {/*p*/}
                                                        {/*  b #{i18n("Ngày")}: &nbsp*/}
                                                        {/*  | #{sessionInfo.dayOfWeekLabel}, #{sessionInfo.showDate}*/}
                                                        <div className="dotted-line">
                                                            <b>Suất
                                                                chiếu: &nbsp;</b>{filmData.showTime}&nbsp; | {filmData.showDate}
                                                        </div>
                                                        <div className="dotted-line">
                                                            <b>Ghế: &nbsp;</b>
                                                            <galaxy-summary-seats
                                                                ng-model="bookingTickets"
                                                                ng-seat-label="seatLabel"
                                                                className="ng-pristine ng-untouched ng-valid ng-isolate-scope ng-not-empty"
                                                            >
                                                                {seats.map((seat) => (
                                                                    <span
                                                                        className="select-seat ng-binding">{seat} &nbsp; |</span>

                                                                ))}
                                                                {/* ngIf: items.length */}
                                                            </galaxy-summary-seats>
                                                        </div>
                                                        {/* ngIf: appliedVouchers.length */}
                                                    </div>
                                                    <div className="ticket-price-total">
                                                        <p>
                                                            Tổng: &nbsp;
                                                            <galaxy-summary-ticket
                                                                ng-model="tickets"
                                                                ng-concession="concessions"
                                                                ng-booking-tickets="bookingTickets"
                                                                ng-discount="discountAmount"
                                                                ng-loyayty-discount="loyaltyDiscount"
                                                                className="ng-pristine ng-untouched ng-valid ng-isolate-scope ng-not-empty"
                                                            >
                                                                <span className="ng-binding">{price} VNĐ</span>
                                                            </galaxy-summary-ticket>
                                                        </p>
                                                    </div>
                                                    <div
                                                        ng-hide='step=="select-infomation"'
                                                        className="ticket-button ng-hide"
                                                    >
                                                        <a
                                                            ng-hide='step=="select-ticket"'
                                                            href="javascript:;"
                                                            ng-click='backToOrder("return")'
                                                            className="btn primary-arrow primary-arrow-left"
                                                        >
                                                            Quay lại
                                                        </a>
                                                        <a
                                                            href="javascript:;"
                                                            ng-click="submitTicket()"
                                                            className="btn primary-arrow primary-arrow-right right"
                                                        >
                                                            <i
                                                                ng-show="isSubmit"
                                                                className="fa fa-pulse fa-spinner ng-hide"
                                                            />
                                                            Tiếp tục
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
            <Footer/>
        </>
    )
}