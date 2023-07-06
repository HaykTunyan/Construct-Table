// Customs Function.


export const StatusType = (status) => {
    switch (status) {
        case "PAUSED":
            return "PAUSED";
            break;
        case "completed":
            return "DONE";
            break;
    }
}
