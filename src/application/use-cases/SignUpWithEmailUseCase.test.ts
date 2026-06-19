import { describe, it, expect, vi } from 'vitest';
import { SignUpWithEmailUseCase } from './SignUpWithEmailUseCase';
import { AuthRepository } from '../../domain/repositories/AuthRepository';

describe('SignUpWithEmailUseCase', () => {
  it('should call authRepository.signUpWithEmail and return user', async () => {
    const mockAuthRepo: AuthRepository = {
      loginWithEmail: vi.fn(),
      signUpWithEmail: vi.fn().mockResolvedValue({ id: '2', email: 'new@test.com' }),
    };
    
    const useCase = new SignUpWithEmailUseCase(mockAuthRepo);
    const result = await useCase.execute('new@test.com', 'password123');
    
    expect(mockAuthRepo.signUpWithEmail).toHaveBeenCalledWith('new@test.com', 'password123');
    expect(result).toEqual({ id: '2', email: 'new@test.com' });
  });
});
