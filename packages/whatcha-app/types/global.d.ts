interface Window {
  AndroidInterface: {
    getToken: () => string;
    getEmail: () => string;
    getName: () => string;
    getUserId: () => number;
    getAddress: () => string;
    getPhone: () => string;
    getBudgetMin: () => number;
    getBudgetMax: () => number;
    getNotificationAgree: () => boolean;
    getLocationAgree: () => boolean;
    getPrefer1: () => string;
    getPrefer2: () => string;
    getPrefer3: () => string;
    getLatitude: () => number;
    getLongitude: () => number;
    setPrefer1: (newPrefer1: string) => void;
    setPrefer2: (newPrefer2: string) => void;
    setPrefer3: (newPrefer3: string) => void;
    setBudgetMin: (newBudgetMin: number) => void;
    setBudgetMax: (newBudgetMax: number) => void;
    log: (message: string) => void;
  };
}
