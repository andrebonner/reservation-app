export type User = {
    id: number;
    username:string;
    password?: string;
    role: string;
    enabled?: boolean;
    accountNonExpired?: boolean;
    accountNonLocked?: boolean;
    credentialsNonExpired?: boolean;
    authorities?: any;
    reservations?: Reservation[];
}

export type Hotel = {
    id: number;
    name: string;
    location: string;
    status: string;
    rooms?: HotelRoom[];
}

export type HotelRoom = {
    id: number;
    name: string;
    location: string;
    status: string;
    reservations?: Reservation[];
}

export type Reservation = {
    check_in_time: string;
    check_out_time: string;
}

export type Flight = {
    id: number;
    number: string;
    origin: string;
    arrival_date: string;
    destination: string;
    departure_date: string;
    seats: number;
}

export type Authentication = {
    username: string;
    password: string;
    token?: string;
}

export const headers = {
    Authorization: "Bearer " + sessionStorage.getItem("Token"),
  };

export const setEnabled = (user:User) => {
    console.log(user);
    user.accountNonExpired = user.enabled;
    user.accountNonLocked = user.accountNonExpired;
    user.credentialsNonExpired = user.accountNonLocked;
    return user;
}