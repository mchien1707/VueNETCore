export default interface MenuItem {
  label: string | null;
  icon?: string;
  to?: string;
  command?(item: MenuItem): void;
  class?: string;
}
