
-- Create waste reports table
CREATE TABLE public.waste_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  waste_type TEXT NOT NULL CHECK (waste_type IN ('plastic', 'paper', 'glass', 'metal', 'organic', 'electronic', 'other')),
  location_name TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'resolved')),
  points_awarded INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on waste_reports table
ALTER TABLE public.waste_reports ENABLE ROW LEVEL SECURITY;

-- Create policies for waste_reports table
CREATE POLICY "Users can view all waste reports" 
  ON public.waste_reports 
  FOR SELECT 
  TO authenticated
  USING (true);

CREATE POLICY "Users can create their own waste reports" 
  ON public.waste_reports 
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own waste reports" 
  ON public.waste_reports 
  FOR UPDATE 
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Staff and admins can update any waste report" 
  ON public.waste_reports 
  FOR UPDATE 
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('staff', 'admin', 'recycler')
    )
  );

-- Function to award points when waste report is created
CREATE OR REPLACE FUNCTION public.award_points_for_report()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  -- Award 10 points for each waste report
  UPDATE public.profiles 
  SET points = points + 10,
      updated_at = now()
  WHERE id = NEW.user_id;
  
  -- Set points awarded on the report
  NEW.points_awarded = 10;
  
  RETURN NEW;
END;
$$;

-- Trigger to award points when waste report is created
CREATE TRIGGER on_waste_report_created
  BEFORE INSERT ON public.waste_reports
  FOR EACH ROW EXECUTE FUNCTION public.award_points_for_report();
