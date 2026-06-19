-- 기존 notes 정책 제거
DROP POLICY IF EXISTS "Users can view their own notes." ON public.notes;
DROP POLICY IF EXISTS "Users can insert their own notes." ON public.notes;
DROP POLICY IF EXISTS "Users can update their own notes." ON public.notes;
DROP POLICY IF EXISTS "Users can delete their own notes." ON public.notes;

-- 새로운 notes 정책 추가 (결제한 pro, business 플랜 유저만 접근 가능)
CREATE POLICY "Pro users can view their own notes." 
    ON public.notes FOR SELECT
    USING (
        auth.uid() = user_id 
        AND EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND plan IN ('pro', 'business')
        )
    );

CREATE POLICY "Pro users can insert their own notes." 
    ON public.notes FOR INSERT
    WITH CHECK (
        auth.uid() = user_id 
        AND EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND plan IN ('pro', 'business')
        )
    );

CREATE POLICY "Pro users can update their own notes." 
    ON public.notes FOR UPDATE
    USING (
        auth.uid() = user_id 
        AND EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND plan IN ('pro', 'business')
        )
    );

CREATE POLICY "Pro users can delete their own notes." 
    ON public.notes FOR DELETE
    USING (
        auth.uid() = user_id 
        AND EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND plan IN ('pro', 'business')
        )
    );
