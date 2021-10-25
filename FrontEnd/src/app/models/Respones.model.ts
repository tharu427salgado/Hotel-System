export interface Response {
    data: string;
    status: string;
    admin: boolean;
    usename: string;
    email: string;
    phoneNum: number;
}

export interface BookingRes {
    id: number;
    loginid: number;
    idcard: string;
    name: string;
    phonenum: number;
    email: string;
    date: Date;
    admin_check: boolean;
}

export interface ReportRes {
    id: number;
    roomnum: number;
    name: string;
    phonenum: number;
    theproblems: string;
    requre: string;
    title: string;
    admin_check: boolean;
}

export interface CheckoutRes {
    id: number;
    roomnum: number;
    name: string;
    phonenum: number;
    date: Date;
    admin_check: boolean;
}

export interface UserRes {
    id: number;
    username: string;
    usersurname: string;
    password: string;
    usename: string;
    idcard: string;
    phonenum: number;
    email: string;
    address: string;
}

export interface PayRes {
    id: number
    roomnum: number;
    name: string;
    phonenum: number;
    time: string;
    date: string;
    amount: string;
    bank: string;
    image: string;
}
