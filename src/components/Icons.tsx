import { 
  ArrowRight, 
  Share2, 
  Globe, 
  Mail as MailIcon, 
  UserCircle 
} from "lucide-react";

export const ArrowForward = ({ className }: { className?: string }) => (
  <ArrowRight className={className} />
);

export const Share = ({ className }: { className?: string }) => (
  <Share2 className={className} />
);

export const Public = ({ className }: { className?: string }) => (
  <Globe className={className} />
);

export const Mail = ({ className }: { className?: string }) => (
  <MailIcon className={className} />
);

export const AccountCircle = ({ className }: { className?: string }) => (
  <UserCircle className={className} />
);
