export interface ITTSPlayerState {
  open: boolean;
  loading: boolean;
  audioUrl: string | null;
  text: string | null;
  autoPlayTrigger: boolean;
}
