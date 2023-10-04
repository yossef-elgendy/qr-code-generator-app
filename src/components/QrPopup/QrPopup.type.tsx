export interface QrPopupProps {
    isOpen: boolean;
    onClose: () => void;
    url: string;
    color: ColorInfo;
}

interface ColorInfo {
    hex: string;
    hsv: {
      h: number;
      s: number;
      v: number;
      a: number;
    };
    rgb: {
      r: number;
      g: number;
      b: number;
      a: number;
    };
}
